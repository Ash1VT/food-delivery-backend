import BaseSettings from "../BaseSettings";

export default interface ISettingsBuilder {
    build(): BaseSettings;
}