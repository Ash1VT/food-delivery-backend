from sqladmin import ModelView
from models import WorkingHours


class WorkingHoursAdmin(ModelView, model=WorkingHours):
    name_plural = "Working Hours"

    column_list = [WorkingHours.id,
                   WorkingHours.day_of_week,
                   WorkingHours.opening_time,
                   WorkingHours.closing_time,
                   WorkingHours.restaurant_id]

    icon = "fa-solid fa-clock"
