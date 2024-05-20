import bingMaps from "@src/core/setup/bingMaps";
import { BingMapesLocationResponse, Coordinates } from "./bingMaps.types";
import { AxiosResponse } from "axios";

const getCoordinates = async (address: string, apiKey: string): Promise<Coordinates | null> => {
    const url = `Locations/`;

    const params = {
        q: address,
        key: apiKey
    }
    try {
        const response: AxiosResponse<BingMapesLocationResponse> = await bingMaps.get(url, { params });
        const data = response.data;

        if (data && data.resourceSets && data.resourceSets.length > 0) {
            const resources = data.resourceSets[0].resources;
            if (resources && resources.length > 0) {
                const coordinates = resources[0].point.coordinates;
                return {
                    latitude: coordinates[0],
                    longitude: coordinates[1]
                };
            }
        }

        return null;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}

export default getCoordinates