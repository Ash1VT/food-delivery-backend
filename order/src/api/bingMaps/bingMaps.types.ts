export interface BingMapsRoute {
    distanceUnit: string;
    durationUnit: string;
    travelDuration: number;
    travelDistance: number;
}

export interface BingMapsGeocodePoint {
    type: string
    coordinates: [number, number]
}

export interface BingMapsRouteResponse {
    statusCode: number;
    statusDescription: string;
    resourceSets: {
        estimatedTotal: number;
        resources: BingMapsRoute[];
    }[];
}

export interface BingMapesLocationResponse {
    statusCode: number;
    statusDescription: string;
    resourceSets: {
        estimatedTotal: number;
        resources: {
            point: BingMapsGeocodePoint
        }[]
    }[];
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}