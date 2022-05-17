import logging
from ..shared_code import TodoItem, CookieJar
import azure.functions as func


def main(req: func.HttpRequest, outdoc: func.Out[func.Document], todoItems: func.DocumentList ) -> func.HttpResponse:
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
    # Read itemId from route param
    itemId = req.route_params.get('itemId')
    # If item doesn't exist, return error
    if not todoItems:
        return func.HttpResponse(
            f"Invalid item id {itemId}",
            status_code=400)
    # Update item based on request body
    else:
        logging.info(f'Updating todo item with id {itemId}')
        try:
            req_body = req.get_json()
            todoItems[0] = TodoItem.from_json(req_body)
            # Ensure that itemId in JSON matches route param
            todoItems[0]['id'] = itemId
            todoItems[0]['tenantId'] = tenantId
            # Write updated item to Cosmos
            outdoc.set(func.Document.from_dict(todoItems[0]))
        # Return errors
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
        return func.HttpResponse(status_code=200)
        

   