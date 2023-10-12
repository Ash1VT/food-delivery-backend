from sqladmin import ModelView
from models import Moderator


class ModeratorAdmin(ModelView, model=Moderator):
    name_plural = "Moderators"

    column_list = [Moderator.id,
                   Moderator.is_active]

    icon = "fa-solid fa-user"
