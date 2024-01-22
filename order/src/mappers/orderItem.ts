import { OrderItemCreateInputDTO, OrderItemCreateOutputDTO, OrderItemGetOutputDTO } from "../dto/orderItem";
import { OrderItemCreateInput, OrderItemModel, OrderItemWithOrderCreateInput } from "../models/orderItem";
import { IOrderItemGetMapper, IOrderItemCreateMapper } from "./interfaces/instances/orderItem";

export class OrderItemGetMapper implements IOrderItemGetMapper {

    toDto(dbModel: OrderItemModel): OrderItemGetOutputDTO {
        return {
            id: Number(dbModel.id),
            menuItemId: Number(dbModel.menuItemId),
            quantity: dbModel.quantity
        }
    }

    toDtos(dbModels: OrderItemModel[]): OrderItemGetOutputDTO[] {
        return dbModels.map((dbModel) => this.toDto(dbModel))
    }

}

export class OrderItemCreateMapper implements IOrderItemCreateMapper {

    toDto(dbModel: OrderItemModel): OrderItemCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            menuItemId: Number(dbModel.menuItemId),
            quantity: dbModel.quantity
        }
    }

    toDtos(dbModels: OrderItemModel[]): OrderItemCreateOutputDTO[] {
        return dbModels.map((dbModel) => this.toDto(dbModel))
    }

    toDbModel(dtoModel: OrderItemCreateInputDTO): OrderItemWithOrderCreateInput {
        return {
            menuItemId: BigInt(dtoModel.menuItemId),
            quantity: dtoModel.quantity
        }
    }

    toDbModels(dtoModels: OrderItemCreateInputDTO[]): OrderItemWithOrderCreateInput[] {
        return dtoModels.map((dtoModel) => this.toDbModel(dtoModel))
    }

    parse(data: any): OrderItemCreateInputDTO {
        throw new Error("Method not implemented.");
    }

}
