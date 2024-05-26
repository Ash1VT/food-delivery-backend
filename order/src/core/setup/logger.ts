import { createLogger, transports, format } from "winston";
import path from "path";
import serverSettings from "./settings/serverSettings";
import { WinstonGraylog } from '@pskzcompany/winston-graylog';

const { combine, timestamp, printf, colorize } = format;

const getLabel = function(callingModule: any) {
    const fullPath = callingModule.filename;
    const srcIndex = fullPath.indexOf(`${path.sep}src${path.sep}`);
    if (srcIndex !== -1) {
      return fullPath.slice(srcIndex + 1);
    }
    return fullPath;
};

const customFormat = (module: any) => { 
    return printf((info) => {
      return `[${info.timestamp}] | ${info.level} | ORDER | ${getLabel(module)} | - ${info.message}`;
    })
}

const getLogger = (module: any) => {
    return createLogger({
      level: 'debug',
      transports: [
        new transports.Console({
          level: 'debug',
          format: combine(
            colorize({ all: true }),
            timestamp({
              format: 'YYYY-MM-DD hh:mm:ss.SSS A',
            }),
            customFormat(module)
          ),
        }),
        new WinstonGraylog({
          level: 'debug',
          format: combine(
            timestamp({
              format: 'YYYY-MM-DD hh:mm:ss.SSS A',
            }),
            customFormat(module)
          ),
          graylog: {
            servers: [
              {
                host: serverSettings.variables.grayLogHost,
                port: serverSettings.variables.grayLogPort
              }
            ]
          }
        })
      ]
    
    })
}

export default getLogger