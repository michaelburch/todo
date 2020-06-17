import logging
import json
import os
import azure.functions as func
from ..shared_code import TodoItem
from azure.cosmos import exceptions, CosmosClient, PartitionKey

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Listing todo items')
    headers = {"Content-Type": "application/json"}
    try:
        # Read client settings from environment
        database_name = os.environ['DB_NAME']
        collection_name = os.environ['COLLECTION_NAME']
        # Create an empty documentlist
        todos = func.DocumentList()
        # Create database and collection if not already existing
        client = CosmosClient.from_connection_string(os.environ['DB_CSTR'])
        client.create_database_if_not_exists(database_name,False,0)
        database = client.get_database_client(database_name)
        database.create_container_if_not_exists(collection_name,PartitionKey("/id"))
        # Read items from collection
        container = database.get_container_client(collection_name)
        items = container.read_all_items()
        for item in items:
            # Deserialize items to todos, dropping system properties
            try:
                item = TodoItem.from_json(item)
                todos.append(item)
            except:
                pass
        return func.HttpResponse(
                body=json.dumps(todos.data),
                headers=headers,
                status_code=200
            )
    except Exception as inst:
        return func.HttpResponse(
                body=inst,
                status_code=500
            )
