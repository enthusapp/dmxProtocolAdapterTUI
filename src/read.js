/* eslint-disable no-console */
const SLICE_LENGTH = 160;

module.exports = ret => {
  if (!ret.read) {
    console.log(ret);
    return;
  }

  for (let i = 0; i < ret.read.length; i += SLICE_LENGTH) {
    console.log(
      ret.read
        .slice(i, i + SLICE_LENGTH)
        .map(e => `${Math.floor((e / 256) * 10)}`)
        .join(''),
    );
  }
};
