import uuid


class TodoItem(dict):

    def __init__(self, tenantId, name, isComplete, itemId):
        dict.__init__(self, tenantId=tenantId, name=name, isComplete=isComplete, id=itemId)


def from_json(dct):
    complete = dct.get('isComplete', False)
    tenantId = dct.get('tenantId', str(uuid.uuid4()))
    itemId = dct.get('id', str(uuid.uuid4()))
    return TodoItem(tenantId, dct['name'], complete, itemId)
