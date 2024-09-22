exports.base64ToBuffer = (base64Image) => {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  };
  