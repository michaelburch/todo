import logging
import os
import json
import uuid
from azure.cosmos import exceptions, CosmosClient, PartitionKey
import azure.functions as func
from ..shared_code import Tenant


def main(req: func.HttpRequest ) -> func.HttpResponse:
    headers = {"Content-Type": "application/json"}
    # Read client settings from environment
    database_name = os.environ['DB_NAME']
    collection_name = "tenants"
    # Read and validate uniqueId from route param
    uniqueId = req.route_params.get('uniqueId')
    try:
        uuid.UUID(uniqueId, version=4)
    except:
        return func.HttpResponse(
            f"Invalid identifier",
            status_code=400)
        
    tenants = list()
    # Search all tenants for a deviceId that matches the uniqueId provided
    # this could be a cookie value or mobile device identifier
    try:
        client = CosmosClient.from_connection_string(os.environ['DB_CSTR'])
        client.create_database_if_not_exists(database_name,False,0)
        database = client.get_database_client(database_name)
        database.create_container_if_not_exists(collection_name,PartitionKey("/id"))
        container = database.get_container_client(collection_name)
        tenants = list(container.query_items(f'SELECT TOP 1 * FROM c where array_contains(c.devices,"{uniqueId}")',enable_cross_partition_query=True))

    except Exception as inst:
        logging.error(str(inst))
        return func.HttpResponse(
            f"Error retrieving tenant: {str(type(inst))}: {str(inst)} " ,
            status_code=400)

    # If uniqueId not found, associate with a new tenant
    if not tenants:
        logging.warning("Tenant list empty")
        logging.warning(len(tenants))
        devices = [uniqueId]
        tenant = Tenant.from_json({"devices":devices})
    # Upsert item
    # This will create new tenants 
    # as well as update deviceIds and timestamps for existing tenants
    else:
        tenant = Tenant.from_json(tenants[0])
        if uniqueId not in tenant['devices']:
            tenant['devices'].append(uniqueId)
        
    try:
        tenantId = json.dumps({"tenantId":tenant['id']})
        container.upsert_item(tenant)
        return func.HttpResponse(status_code=200,body=tenantId,headers=headers)
    except Exception as inst:
        return func.HttpResponse(
            f"Error retrieving tenant: {str(type(inst))}: {str(inst)} " ,
            status_code=400)
        

   