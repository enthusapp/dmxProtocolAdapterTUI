const SerialPort = require('serialport');

module.exports = (portName, msg, cb) => {
  if (typeof portName !== 'string') {
    cb(new Error('잘못된 포트 이름입니다.'));
    return;
  }
  const port = new SerialPort(portName, { baudRate: 9600 });

  port.once('open', () => {
    console.log(`${portName} opened`);
    console.log(`Send ${msg}`);
    port.write(msg, (err) => {
      if (err) cb(err);
    });
  });
};
