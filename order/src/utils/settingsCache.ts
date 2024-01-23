import { Settings } from "../config/Settings";


type SettingsCache = Settings

type SettingsWrapperFunction = () => SettingsCache;

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