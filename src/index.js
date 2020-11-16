const planProtocol = require('./planProtocol');
const sender = require('./sender');

function errorOut(err) {
  console.log(err);
  process.exit(err);
}

planProtocol(Number(process.argv[3]), (err, command) => {
  if (err) {
    errorOut(err);
    return;
  }

  sender(process.argv[2], command, (serr) => {
    if (serr) errorOut(serr);
  });
});
