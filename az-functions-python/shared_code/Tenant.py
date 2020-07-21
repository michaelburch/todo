import uuid


class Tenant(dict):

    def __init__(self, tenantId, deviceIds):
        dict.__init__(self, id=tenantId, devices=deviceIds)


def from_json(dct):
    deviceIds = dct.get('devices', [])
    tenantId = dct.get('id', str(uuid.uuid4()))
    return Tenant(tenantId,deviceIds)
