import { ConfiguredFunction } from "../types/config.type";

let cache: CallableFunction | undefined;

export default function configCache(func: ConfiguredFunction): ConfiguredFunction {

    const wrapper: ConfiguredFunction = (...args: any[]) => {

        if (cache) {
            return cache
        }

        cache = func(...args);
        return cache
    };

    return wrapper;
}