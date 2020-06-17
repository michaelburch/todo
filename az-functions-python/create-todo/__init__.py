import logging
from ..shared_code import TodoItem
import azure.functions as func


def main(req: func.HttpRequest, doc: func.Out[func.Document]) -> func.HttpResponse:
    logging.info('Creating new todo item')
    try:
        # Create item using JSON from request body
        req_body = req.get_json()
        todoItem = TodoItem.from_json(req_body)
        # Create item in database
        doc.set(func.Document.from_dict(todoItem))
        logging.info(f' Created item {todoItem["id"]}')

    except KeyError as inst:
        logging.info(inst)
        return func.HttpResponse(
             f"Missing field: {str(inst)}" ,
             status_code=400
        )
    except Exception as inst:
        logging.info(inst)
        return func.HttpResponse(
             f"Error processing Todo item: {str(type(inst))}: {str(inst)} " ,
             status_code=500
        )
    # Return the uri of the new item
    return func.HttpResponse(
        f'{req.url}{todoItem["id"]}',
        status_code=201)

   