module.exports = (planNumber, cb) => {
  if (typeof planNumber !== 'number') {
    cb(new Error('잘못된 플랜 번호입니다.'));
    return;
  }

  if (planNumber > 50) {
    cb(new Error('플랜 번호가 너무 큽니다.'));
    return;
  }

  const command = [
    0x02,
    0xFA,
    0xFF,
    0xFF,
    0xF9,
    planNumber,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x01,
  ];

  cb(null, new Uint8Array(
    command.concat([command.reduce((a, c) => a + c, 0), 0xF7, 0x03]),
  ));
};
