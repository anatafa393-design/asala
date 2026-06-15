import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public', 'images');
const outputDataFile = path.join(__dirname, 'src', 'data.js');

let projects = [];

const categories = fs.readdirSync(publicDir);
categories.forEach(category => {
  const categoryPath = path.join(publicDir, category);
  if (fs.statSync(categoryPath).isDirectory()) {
    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.webp'));
    if (files.length > 0) {
      // Map folder names to nicer English titles if possible
      let title = category.replace(/_/g, ' ');
      if (category.includes('اسقف')) title = 'Ceilings Design';
      if (category.includes('جدران')) title = 'Wall Decor';
      if (category.includes('مطابخ')) title = 'Kitchens';
      if (category.includes('غرف_نوم')) title = 'Bedrooms';
      if (category.includes('مجالس')) title = 'Majlis & Living';
      if (category.includes('مكاتب')) title = 'Offices';
      if (category.includes('حمامات')) title = 'Bathrooms';
      if (category.includes('خارجيه')) title = 'Exteriors';
      if (category.includes('مطاعم')) title = 'Restaurants';
      if (category.includes('مداخل')) title = 'Entrances';

      const gallery = files.map(f => `/images/${category}/${f}`);
      projects.push({
        id: category,
        title: title,
        cover: gallery[0], // first image as cover
        gallery: gallery
      });
    }
  }
});

const content = `export const projects = ${JSON.stringify(projects, null, 2)};\n`;
fs.writeFileSync(outputDataFile, content);
console.log('data.js generated successfully!');
