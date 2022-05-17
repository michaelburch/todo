import logging
import os
from azure.cosmos import exceptions, CosmosClient, PartitionKey
from ..shared_code import CookieJar
import azure.functions as func


def main(req: func.HttpRequest ) -> func.HttpResponse:
    # Read client settings from environment
    database_name = os.environ['DB_NAME']
    collection_name = os.environ['COLLECTION_NAME']
    # Read itemId from route param
    itemId = req.route_params.get('itemId')
    # Read tenantId from route param
    #tenantId = req.route_params.get('tenantId')
    try:
        # Read cookie
        logging.info('reading cookie')
        #domain = req.url.split('/')[2].split(':')[0]
        domain = "todo.trailworks.io"
        tenantId = CookieJar.validate(domain, req.headers['Cookie'])
    except Exception as inst:
        logging.info(inst)
        return func.HttpResponse(
                body=f"Invalid authorization",
                status_code=401
            )
    # If item doesn't exist, return error
    #if not todoItems:
    #    return func.HttpResponse(
    #        f"Invalid item id {itemId}",
    #        status_code=400)
    # Delete item
    else:
        try:
            client = CosmosClient.from_connection_string(os.environ['DB_CSTR'])
            database = client.get_database_client(database_name)
            container = database.get_container_client(collection_name)
            container.delete_item(itemId,tenantId)
            return func.HttpResponse(status_code=200)
        except Exception as inst:
            return func.HttpResponse(
                f"Error deleting item: {str(type(inst))}: {str(inst)} " ,
                status_code=400)
        

   