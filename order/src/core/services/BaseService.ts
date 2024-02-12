import { CourierModel } from "@src/modules/users/models/courier.models";
import { CustomerModel } from "@src/modules/users/models/customer.models";
import { ModeratorModel } from "@src/modules/users/models/moderator.models";
import { RestaurantManagerModel } from "@src/modules/users/models/restaurantManager.models";

export default abstract class BaseService {
    private _customer?: CustomerModel
    private _courier?: CourierModel
    private _restaurantManager?: RestaurantManagerModel
    private _moderator?: ModeratorModel

    public get customer(): CustomerModel | undefined {
        return this._customer
    }
    
    public set customer(value: CustomerModel) {
        this._customer = value
    }

    public get courier(): CourierModel | undefined {
        return this._courier
    }

    public set courier(value: CourierModel) {
        this._courier = value
    }

    public get restaurantManager(): RestaurantManagerModel | undefined {
        return this._restaurantManager
    }

    public set restaurantManager(value: RestaurantManagerModel) {
        this._restaurantManager = value
    }

    public get moderator(): ModeratorModel | undefined {
        return this._moderator
    }
    
    public set moderator(value: ModeratorModel) {
        this._moderator = value
    }
}