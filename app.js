const winston = require('winston');
const { format } = winston;
const fs = require('fs');
const faker = require('faker');

const logDir = '/var/log/log-generator';


// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  defaultMeta: { service: 'log-generator' },
  transports: [
    new winston.transports.File({
      filename: `${logDir}/app.log`,
      level: 'info'
    })
  ]
});

// Generate random info and error logs every 5 seconds
setInterval(() => {
  const randomNumber = Math.random();
  if (randomNumber < 0.5) {
    logger.info(faker.lorem.sentence());
  } else {
    logger.error(faker.lorem.sentence());
  }
}, 5000);
