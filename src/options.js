module.exports = {
  invert: {
    alias: 'i',
    description: '데이터 반전',
    type: 'number',
  },
  '0to100': {
    alias: 'z',
    description: '제로백 시간 설정',
    type: 'number',
  },
  channel: {
    alias: 'c',
    description: 'RGB 채널 순서 선택 ex) RGB, RBG, GRB, ...',
    type: 'string',
  },
  start: {
    alias: 's',
    description: 'RGB 샘플링 시작 채널 선택',
    type: 'number',
  },
  port: {
    alias: 'p',
    description: 'COM Port 이름 ex) COM3, COM12',
    type: 'string',
    demandOption: true,
  },
};
