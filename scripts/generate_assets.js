const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Minimal valid 1x1 PNG base64
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
const pngBuffer = Buffer.from(pngBase64, 'base64');

const assetFiles = ['icon.png', 'splash-icon.png', 'adaptive-icon.png', 'favicon.png'];

assetFiles.forEach((file) => {
  const filePath = path.join(assetsDir, file);
  fs.writeFileSync(filePath, pngBuffer);
  console.log(`Generated ${file}`);
});
