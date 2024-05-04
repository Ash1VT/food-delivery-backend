from exceptions.base import DatabaseInstanceNotFoundError


class MenuItemNotFoundError(DatabaseInstanceNotFoundError):

    def __init__(self, menu_item_id: int):
        super().__init__("id", menu_item_id, "MenuItem")
