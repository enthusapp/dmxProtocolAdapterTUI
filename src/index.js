/* eslint-disable no-console */
const SerialPort = require('serialport');
const yargs = require('yargs');
const Readline = require('@serialport/parser-readline');

const sender = (portName, msg, cb) => {
  const port = new SerialPort(portName, {
    baudRate: 115200,
  });

  const parser = port.pipe(new Readline({ delimiter: '\n' }));

  parser.on('data', data => {
    const ret = JSON.parse(data);
    console.log(ret);
    cb();
  });

  port.once('open', () => {
    console.log(`${portName} opened`);
    console.log(`Send ${msg}`);
    port.write(`${msg}\n`, err => {
      if (err) cb(err);
    });
  });
};

const { argv } = yargs
  .option('invert', {
    alias: 'i',
    description: '데이터 반전',
    type: 'boolean',
  })
  .option('0to100', {
    alias: 'z',
    description: '제로백 시간 설정',
    type: 'number',
  })
  .option('channel', {
    alias: 'c',
    description: 'RGB 채널 순서 선택',
    type: 'string',
  })
  .option('start', {
    alias: 's',
    description: 'RGB 샘플링 채널 선택',
    type: 'number',
  })
  .option('port', {
    alias: 'p',
    description: 'COM Port 이름 ex) COM3, COM12',
    type: 'string',
  })
  .help()
  .alias('help', 'h');

const delayMap = new Map([
  [0.1, { smooth_delay: 33, smooth_delta: 85 }],
  [0.2, { smooth_delay: 33, smooth_delta: 42 }],
  [0.3, { smooth_delay: 33, smooth_delta: 28 }],
  [0.4, { smooth_delay: 33, smooth_delta: 21 }],
  [0.5, { smooth_delay: 33, smooth_delta: 17 }],
  [0.6, { smooth_delay: 33, smooth_delta: 14 }],
  [0.7, { smooth_delay: 33, smooth_delta: 12 }],
  [0.8, { smooth_delay: 35, smooth_delta: 11 }],
  [0.9, { smooth_delay: 35, smooth_delta: 10 }],
  [1.0, { smooth_delay: 35, smooth_delta: 9 }],
  [1.1, { smooth_delay: 35, smooth_delta: 8 }],
  [1.2, { smooth_delay: 33, smooth_delta: 7 }],
  [1.3, { smooth_delay: 36, smooth_delta: 7 }],
  [1.4, { smooth_delay: 33, smooth_delta: 6 }],
  [1.5, { smooth_delay: 35, smooth_delta: 6 }],
  [1.6, { smooth_delay: 38, smooth_delta: 6 }],
  [1.7, { smooth_delay: 33, smooth_delta: 5 }],
  [1.8, { smooth_delay: 35, smooth_delta: 5 }],
  [1.9, { smooth_delay: 37, smooth_delta: 5 }],
  [2.0, { smooth_delay: 39, smooth_delta: 5 }],
  [2.1, { smooth_delay: 33, smooth_delta: 4 }],
  [2.2, { smooth_delay: 35, smooth_delta: 4 }],
  [2.3, { smooth_delay: 36, smooth_delta: 4 }],
  [2.4, { smooth_delay: 38, smooth_delta: 4 }],
  [2.5, { smooth_delay: 39, smooth_delta: 4 }],
  [2.6, { smooth_delay: 41, smooth_delta: 4 }],
  [2.7, { smooth_delay: 42, smooth_delta: 4 }],
  [2.8, { smooth_delay: 44, smooth_delta: 4 }],
  [2.9, { smooth_delay: 45, smooth_delta: 4 }],
  [3.0, { smooth_delay: 47, smooth_delta: 4 }],
  [3.1, { smooth_delay: 49, smooth_delta: 4 }],
  [3.2, { smooth_delay: 50, smooth_delta: 4 }],
  [3.3, { smooth_delay: 52, smooth_delta: 4 }],
  [3.4, { smooth_delay: 53, smooth_delta: 4 }],
  [3.5, { smooth_delay: 55, smooth_delta: 4 }],
  [3.6, { smooth_delay: 56, smooth_delta: 4 }],
  [3.7, { smooth_delay: 58, smooth_delta: 4 }],
  [3.8, { smooth_delay: 60, smooth_delta: 4 }],
  [3.9, { smooth_delay: 61, smooth_delta: 4 }],
  [4.0, { smooth_delay: 63, smooth_delta: 4 }],
  [4.1, { smooth_delay: 64, smooth_delta: 4 }],
  [4.2, { smooth_delay: 66, smooth_delta: 4 }],
  [4.3, { smooth_delay: 67, smooth_delta: 4 }],
  [4.4, { smooth_delay: 69, smooth_delta: 4 }],
  [4.5, { smooth_delay: 71, smooth_delta: 4 }],
  [4.6, { smooth_delay: 72, smooth_delta: 4 }],
  [4.7, { smooth_delay: 74, smooth_delta: 4 }],
  [4.8, { smooth_delay: 75, smooth_delta: 4 }],
  [4.9, { smooth_delay: 77, smooth_delta: 4 }],
  [5.0, { smooth_delay: 78, smooth_delta: 4 }],
  [5.1, { smooth_delay: 80, smooth_delta: 4 }],
  [5.2, { smooth_delay: 82, smooth_delta: 4 }],
  [5.3, { smooth_delay: 83, smooth_delta: 4 }],
  [5.4, { smooth_delay: 85, smooth_delta: 4 }],
  [5.5, { smooth_delay: 86, smooth_delta: 4 }],
  [5.6, { smooth_delay: 88, smooth_delta: 4 }],
  [5.7, { smooth_delay: 89, smooth_delta: 4 }],
  [5.8, { smooth_delay: 91, smooth_delta: 4 }],
  [5.9, { smooth_delay: 93, smooth_delta: 4 }],
  [6.0, { smooth_delay: 94, smooth_delta: 4 }],
  [6.1, { smooth_delay: 96, smooth_delta: 4 }],
  [6.2, { smooth_delay: 97, smooth_delta: 4 }],
  [6.3, { smooth_delay: 99, smooth_delta: 4 }],
  [6.4, { smooth_delay: 100, smooth_delta: 4 }],
  [6.5, { smooth_delay: 102, smooth_delta: 4 }],
  [6.6, { smooth_delay: 104, smooth_delta: 4 }],
  [6.7, { smooth_delay: 105, smooth_delta: 4 }],
  [6.8, { smooth_delay: 107, smooth_delta: 4 }],
  [6.9, { smooth_delay: 108, smooth_delta: 4 }],
  [7.0, { smooth_delay: 110, smooth_delta: 4 }],
  [7.1, { smooth_delay: 111, smooth_delta: 4 }],
  [7.2, { smooth_delay: 113, smooth_delta: 4 }],
  [7.3, { smooth_delay: 115, smooth_delta: 4 }],
  [7.4, { smooth_delay: 116, smooth_delta: 4 }],
  [7.5, { smooth_delay: 118, smooth_delta: 4 }],
  [7.6, { smooth_delay: 119, smooth_delta: 4 }],
  [7.7, { smooth_delay: 121, smooth_delta: 4 }],
  [7.8, { smooth_delay: 122, smooth_delta: 4 }],
  [7.9, { smooth_delay: 124, smooth_delta: 4 }],
  [8.0, { smooth_delay: 126, smooth_delta: 4 }],
]);

sender(argv.p, JSON.stringify(delayMap.get(argv.z)), () => {
  process.exit();
});
