"""is_active

Revision ID: 8c4058b3d642
Revises: ffb0202db3d6
Create Date: 2023-08-22 21:29:08.542681

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8c4058b3d642'
down_revision: Union[str, None] = 'ffb0202db3d6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('restaurant_managers', sa.Column('is_active', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('restaurant_managers', 'is_active')
    # ### end Alembic commands ###