import { createLogger, transports, format } from "winston";
import path from "path";

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
      format: combine(
        colorize({ all: true }),
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        customFormat(module)
      ),
      transports: [
        new transports.Console()
      ]
    
    })
}

export default getLogger