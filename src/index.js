const yargs = require('yargs');

const smoothMap = require('./smoothMap');
const sender = require('./sender');
const options = require('./options');
const { rgbOrderStr2Code } = require('./rgbOrder');

const { argv } = yargs
  .options(options)
  .help()
  .alias('help', 'h');

const msg = { start_channel: argv.s, ...smoothMap.get(argv.z) };

if (argv.i !== undefined) msg.invert = argv.i ? 1 : 0;
if (argv.c !== undefined) msg.rgb_order = rgbOrderStr2Code(argv.c);
if (argv.w !== undefined) msg.input_wait = argv.w * 1000;

sender(argv.p, JSON.stringify(msg), err => {
  if (err) console.error(err);
  process.exit();
});
