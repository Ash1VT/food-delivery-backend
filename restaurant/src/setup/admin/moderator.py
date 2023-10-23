from sqladmin import ModelView
from models import Moderator


class ModeratorAdmin(ModelView, model=Moderator):
    name_plural = "Moderators"

    column_list = [
        Moderator.id
    ]

    icon = "fa-solid fa-user"
