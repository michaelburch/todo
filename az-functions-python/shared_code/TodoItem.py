import uuid


class TodoItem(dict):

    def __init__(self, name, isComplete, itemId):
        dict.__init__(self, name=name, isComplete=isComplete, id=itemId)


def from_json(dct):
    complete = dct.get('isComplete', False)
    itemId = dct.get('id', str(uuid.uuid4()))
    return TodoItem(dct['name'], complete, itemId)
