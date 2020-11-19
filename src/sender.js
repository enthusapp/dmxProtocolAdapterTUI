/* eslint-disable no-console */
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

module.exports = (portName, msg, cb) => {
  const port = new SerialPort(portName, {
    baudRate: 115200,
  });

  const parser = port.pipe(new Readline({ delimiter: '\n' }));

  parser.on('data', data => cb(null, data));

  port.once('open', () => {
    console.log(`${portName} opened`);
    console.log(`Send ${msg}`);
    port.write(`${msg}\n`, err => {
      if (err) cb(err);
    });
  });
};
