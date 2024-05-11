import axios from "axios";

const bingMaps = axios.create({
    baseURL: "https://dev.virtualearth.net/REST/v1/"
})

export default bingMaps;