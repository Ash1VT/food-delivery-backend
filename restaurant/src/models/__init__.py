# IMPORTANT FOR ALEMBIC'S DETECTION OF TABLES #
# IMPORT ALL MODELS HERE #
from .base import Base, CustomBase
from .manager import RestaurantManager
from .moderator import Moderator
from .restaurant import WorkingHours, Restaurant
