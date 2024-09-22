const genAI = require('../config/gemini');

exports.analyzeImage = async (imageBuffer, dictOfVars) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
In the given hand drawn image, if two linear equations in two variables x and y will be given, solve the problem and return the result in the form of x=2, y=4 only. No explanation, direct answer.

If mathematical calculation is given, like 2 + 2, return 2 + 2 = 4.

If the image is a drawing, decipher it and explain it in shortest possible way, not more than 15 words. And in the image consider a stick figure a person. If it depicts a historical event, do describe it in brief.

If the image is a mathematical trignometric equation, solve it and return the correct values, answers only with the problem statement. both in the form of decimal and fraction. And if the image is calculus problem, solve it and return the correct answer in correct form.

If the image depicts a physics problem, while returning answer, show one or two steps of solution with the answer.
`;

  const imagePart = {
    inlineData: {
      data: imageBuffer.toString('base64'),
      mimeType: 'image/png'
    }
  };

  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  return response.text();

  
};
