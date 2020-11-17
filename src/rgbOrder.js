exports.rgbOrderStr2Code = str => {
  switch (str) {
    case 'RGB':
    case 'rgb':
    default:
      return 0;
    case 'RBG':
    case 'rbg':
      return 1;
    case 'GRB':
    case 'grb':
      return 2;
    case 'GBR':
    case 'gbr':
      return 3;
    case 'BRG':
    case 'brg':
      return 4;
    case 'BGR':
    case 'bgr':
      return 5;
  }
};
