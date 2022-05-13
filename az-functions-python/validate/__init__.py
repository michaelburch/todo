from http import cookiejar
import logging
from ..shared_code import CookieJar
import azure.functions as func

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Listing todo items')
    headers = {"Content-Type": "application/json"}
    logging.info(req.headers)
    try:
        # Read cookie
        domain = req.url.split('/')[2].split(':')[0]
        tenantId = CookieJar.validate(domain, req.headers['Cookie'])

        return func.HttpResponse(
                body=f"hello {tenantId} ",
                headers=headers,
                status_code=200
            )
    except Exception as inst:
        logging.info(inst)
        return func.HttpResponse(
                body=f"Invalid authorization",
                status_code=401
            )
