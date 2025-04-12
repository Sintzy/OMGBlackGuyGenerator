const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

module.exports = async function processImage(uploadedImagePath) {
    const templatePath = path.join(process.cwd(), 'public', 'template.png');
  const template = await loadImage(templatePath);
  const uploadedImage = await loadImage(uploadedImagePath);
  const canvas = createCanvas(template.width, template.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(template, 0, 0);


  const x = 73;
  const y = 570;
  const overlayWidth = 1200;
  const overlayHeight = 500;

  ctx.drawImage(uploadedImage, x, y, overlayWidth, overlayHeight);
  fetch(`${baseUrl}/api/contador`, { method: 'POST' });
  return canvas.toBuffer();
};
