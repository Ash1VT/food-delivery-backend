"""initial

Revision ID: edf18ed33349
Revises: 
Create Date: 2023-08-10 17:17:28.557569

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'edf18ed33349'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('menu_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('menus',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('restaurant_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], use_alter=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('restaurants',
    sa.Column('id', sa.Integer(), autoincrement=False, nullable=False),
    sa.Column('current_menu_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['current_menu_id'], ['menus.id'], use_alter=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('current_menu_id')
    )
    op.create_table('menu_categories_association',
    sa.Column('menu_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.ForeignKeyConstraint(['menu_id'], ['menus.id'], ),
    sa.PrimaryKeyConstraint('menu_id', 'category_id')
    )
    op.create_table('menu_items_categories_association',
    sa.Column('menu_item_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.ForeignKeyConstraint(['menu_item_id'], ['menu_items.id'], ),
    sa.PrimaryKeyConstraint('menu_item_id', 'category_id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('menu_items_categories_association')
    op.drop_table('menu_categories_association')
    op.drop_table('restaurants')
    op.drop_table('menus')
    op.drop_table('menu_items')
    op.drop_table('categories')
    # ### end Alembic commands ###