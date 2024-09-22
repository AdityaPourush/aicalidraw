const geminiService = require('../services/geminiService');
const imageUtils = require('../utils/imageUtils');

exports.processImage = async (req, res) => {
  try {
    const { image, dict_of_vars } = req.body.data;
    const imageBuffer = imageUtils.base64ToBuffer(image);
    const result = await geminiService.analyzeImage(imageBuffer, dict_of_vars);
    console.log('Result:', result); 
    res.json({ result });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
