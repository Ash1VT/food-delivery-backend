"""is_active

Revision ID: e31df2a4131c
Revises: cfedbf71580d
Create Date: 2024-05-08 16:16:03.624414

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e31df2a4131c'
down_revision: Union[str, None] = 'cfedbf71580d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('restaurants', sa.Column('is_active', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('restaurants', 'is_active')
    # ### end Alembic commands ###
