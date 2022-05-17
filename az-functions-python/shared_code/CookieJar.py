import uuid
from http.cookies import SimpleCookie

class CookieJar(dict):

    def __init__(self, header, value):
        dict.__init__(self, header=header, value=value)


def new(domain, cookieValue=str(uuid.uuid4()), expiration=3 * 30 * 24 * 60 * 60, sameSite='Strict'):
    # Create cookie, defaulting to 1 yr expiration
    newCookie = SimpleCookie()
    newCookie[domain] = cookieValue
    newCookie[domain]['expires'] = expiration
    newCookie[domain]['HttpOnly'] = True
    newCookie[domain]['SameSite'] = sameSite
    newCookie[domain]['Domain'] = domain
    newCookie[domain]['Secure'] = True
    
    return CookieJar({"Set-Cookie":newCookie.output(header='')},cookieValue)

def validate(domain, header):
    return SimpleCookie(header)[domain].value