import { Coordinates } from "@src/api/bingMaps/bingMaps.types";

const getAcrossDistance = (point1: Coordinates, point2: Coordinates): number => {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(point2.latitude - point1.latitude);
    const dLon = toRadians(point2.longitude - point1.longitude);

    const lat1 = toRadians(point1.latitude);
    const lat2 = toRadians(point2.latitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
}


export default getAcrossDistance