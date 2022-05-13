import logging

from ..shared_code import CookieJar
import azure.functions as func

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Listing todo items')
    
    logging.info(req.headers)
    try:
        domain = req.url.split('/')[2].split(':')[0]
        cookie = CookieJar.new(domain)
        headers = {"Content-Type": "application/json"}
        headers.update(cookie["header"])

        return func.HttpResponse(
                body=f"hello {cookie['header']}",
                headers=headers,
                status_code=200
            )
    except Exception as inst:
        logging.info(inst)
        return func.HttpResponse(
                body=f"Invalid authorization",
                status_code=401
            )
