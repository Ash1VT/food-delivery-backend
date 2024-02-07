import { Settings } from "@src/config/Settings";


export type SettingsCache = Settings

export type SettingsWrapperFunction = () => SettingsCache;

let cache: SettingsCache | undefined;

export default function settingsCache(func: SettingsWrapperFunction): SettingsWrapperFunction {

    const wrapper: SettingsWrapperFunction = () => {

        if (cache)
            return cache
        
        cache = func();
        return cache
    };

    return wrapper;
}

export function clearCache() {
    cache = undefined
}

export function getCache(): SettingsCache | undefined {
    return cache
}