import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'asala web');
const targetDir = path.join(__dirname, 'public', 'images');

async function processImages() {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const items = fs.readdirSync(sourceDir);
  for (const item of items) {
    const itemPath = path.join(sourceDir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      const targetSubDir = path.join(targetDir, item);
      if (!fs.existsSync(targetSubDir)) {
        fs.mkdirSync(targetSubDir, { recursive: true });
      }

      const files = fs.readdirSync(itemPath);
      for (const file of files) {
        const filePath = path.join(itemPath, file);
        if (fs.statSync(filePath).isFile()) {
          const ext = path.extname(file).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            const fileNameWithoutExt = path.basename(file, ext);
            const targetFilePath = path.join(targetSubDir, `${fileNameWithoutExt}.webp`);
            
            try {
              console.log(`Processing: ${item}/${file} -> ${item}/${fileNameWithoutExt}.webp`);
              await sharp(filePath)
                .webp({ quality: 80 })
                .toFile(targetFilePath);
            } catch (err) {
              console.error(`Error processing ${filePath}:`, err);
            }
          }
        }
      }
    }
  }
  console.log('Image processing complete!');
}

processImages();
