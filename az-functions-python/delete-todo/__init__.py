import logging
import os
from azure.cosmos import exceptions, CosmosClient, PartitionKey
import azure.functions as func


def main(req: func.HttpRequest, todoItems: func.DocumentList ) -> func.HttpResponse:
    # Read client settings from environment
    database_name = os.environ['DB_NAME']
    collection_name = os.environ['COLLECTION_NAME']
    # Read itemId from route param
    itemId = req.route_params.get('itemId')
    # Read tenantId from route param
    tenantId = req.route_params.get('tenantId')
    # If item doesn't exist, return error
    if not todoItems:
        return func.HttpResponse(
            f"Invalid item id {itemId}",
            status_code=400)
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
        

   