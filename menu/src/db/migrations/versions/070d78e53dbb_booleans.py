"""booleans

Revision ID: 070d78e53dbb
Revises: 4a98536c54c4
Create Date: 2023-10-22 13:44:51.066186

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '070d78e53dbb'
down_revision: Union[str, None] = '4a98536c54c4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('restaurant_managers', 'restaurant_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.drop_column('restaurant_managers', 'is_active')
    op.add_column('restaurants', sa.Column('is_active', sa.Boolean(), nullable=False))
    op.create_foreign_key('fk_current_menu_id', 'restaurants', 'menus', ['current_menu_id'], ['id'], use_alter=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('fk_current_menu_id', 'restaurants', type_='foreignkey')
    op.drop_column('restaurants', 'is_active')
    op.add_column('restaurant_managers', sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.alter_column('restaurant_managers', 'restaurant_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
