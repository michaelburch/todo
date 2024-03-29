import logging
from ..shared_code import TodoItem, CookieJar
import azure.functions as func


def main(req: func.HttpRequest, doc: func.Out[func.Document]) -> func.HttpResponse:
    logging.info('Creating new todo item')
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

    try:
        # Create item using JSON from request body
        req_body = req.get_json()
        todoItem = TodoItem.from_json(req_body)
        todoItem["tenantId"] = f'{tenantId}'
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

   