"""orders

Revision ID: cfedbf71580d
Revises: 74d9ee567e29
Create Date: 2024-04-30 01:45:03.082194

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cfedbf71580d'
down_revision: Union[str, None] = '74d9ee567e29'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('orders',
    sa.Column('id', sa.BigInteger(), autoincrement=False, nullable=False),
    sa.Column('customer_id', sa.BigInteger(), nullable=False),
    sa.Column('courier_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['courier_id'], ['couriers.id'], name='fk_courier_id'),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], name='fk_customer_id'),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('reviews', sa.Column('order_id', sa.BigInteger(), nullable=True))
    op.create_unique_constraint(None, 'reviews', ['order_id'])
    op.drop_constraint('fk_courier_id', 'reviews', type_='foreignkey')
    op.create_foreign_key('fk_order_id', 'reviews', 'orders', ['order_id'], ['id'])
    op.drop_column('reviews', 'courier_id')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('reviews', sa.Column('courier_id', sa.BIGINT(), autoincrement=False, nullable=True))
    op.drop_constraint('fk_order_id', 'reviews', type_='foreignkey')
    op.create_foreign_key('fk_courier_id', 'reviews', 'couriers', ['courier_id'], ['id'])
    op.drop_constraint(None, 'reviews', type_='unique')
    op.drop_column('reviews', 'order_id')
    op.drop_table('orders')
    # ### end Alembic commands ###
