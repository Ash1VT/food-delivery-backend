"""initial

Revision ID: 02934b0803ac
Revises: 
Create Date: 2023-10-10 11:04:51.542008

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '02934b0803ac'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('moderators',
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('restaurants',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('phone', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('restaurant_managers',
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('restaurant_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], name='fk_restaurant_id'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('restaurant_id')
    )
    op.create_table('working_hours',
    sa.Column('day_of_week', sa.Enum('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', name='dayofweek'), nullable=False),
    sa.Column('opening_time', sa.Time(), nullable=False),
    sa.Column('closing_time', sa.Time(), nullable=False),
    sa.Column('restaurant_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('working_hours')
    op.drop_table('restaurant_managers')
    op.drop_table('restaurants')
    op.drop_table('moderators')
    op.execute("DROP TYPE dayofweek")
    # ### end Alembic commands ###
