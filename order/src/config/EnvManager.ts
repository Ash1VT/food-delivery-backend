export default class EnvManager {

    public static getVariable(name: string): string {
        
        const value = process.env[name];
        if (value === undefined || value === null) {
            throw new Error(`Environment variable '${name}' is missing.`);
        }
        return value;
    }

}
