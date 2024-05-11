export interface BingMapsRoute {
    distanceUnit: string;
    durationUnit: string;
    travelDuration: number;
    travelDistance: number;
}

export interface BingMapsRouteResponse {
    statusCode: number;
    statusDescription: string;
    resourceSets: {
        estimatedTotal: number;
        resources: BingMapsRoute[];
    }[];
}