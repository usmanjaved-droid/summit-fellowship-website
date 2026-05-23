#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join(process.cwd(), 'public', 'images');
const results = {
  compressed: [],
  converted: [],
  skipped: [],
  errors: [],
};

let totalBefore = 0;
let totalAfter = 0;

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      const sizeBefore = stat.size;
      totalBefore += sizeBefore;

      try {
        if (['.jpg', '.jpeg'].includes(ext)) {
          // Compress JPEG
          const buffer = fs.readFileSync(fullPath);
          const compressed = await sharp(buffer)
            .jpeg({ quality: 75, progressive: true })
            .toBuffer();

          fs.writeFileSync(fullPath, compressed);
          const sizeAfter = compressed.length;
          totalAfter += sizeAfter;
          const saved = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);

          results.compressed.push({
            file: path.relative(publicImagesDir, fullPath),
            before: (sizeBefore / 1024).toFixed(1),
            after: (sizeAfter / 1024).toFixed(1),
            saved: saved,
          });
        } else if (ext === '.png') {
          // Convert PNG to WebP
          const buffer = fs.readFileSync(fullPath);
          const webpBuffer = await sharp(buffer)
            .webp({ quality: 80 })
            .toBuffer();

          const newPath = fullPath.replace(/\.png$/i, '.webp');
          fs.writeFileSync(newPath, webpBuffer);
          fs.unlinkSync(fullPath); // Remove original PNG

          const sizeAfter = webpBuffer.length;
          totalAfter += sizeAfter;
          const saved = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);

          results.converted.push({
            file: path.relative(publicImagesDir, fullPath),
            newFile: path.relative(publicImagesDir, newPath),
            before: (sizeBefore / 1024).toFixed(1),
            after: (sizeAfter / 1024).toFixed(1),
            saved: saved,
          });
        } else if (ext === '.webp' || ext === '.svg') {
          // Skip already optimal formats
          totalAfter += sizeBefore;
          results.skipped.push(path.relative(publicImagesDir, fullPath));
        }
      } catch (error) {
        results.errors.push({
          file: path.relative(publicImagesDir, fullPath),
          error: error.message,
        });
        totalAfter += sizeBefore; // Count original size on error
      }
    }
  }
}

async function main() {
  console.log('🖼️ Image Optimization Starting...\n');
  console.log(`📂 Processing: ${publicImagesDir}\n`);

  await processDirectory(publicImagesDir);

  console.log('\n✅ COMPRESSION RESULTS\n');
  console.log(`📦 JPEGs Compressed: ${results.compressed.length}`);
  results.compressed.slice(0, 10).forEach((r) => {
    console.log(`   ${r.file}: ${r.before}KB → ${r.after}KB (saved ${r.saved}%)`);
  });
  if (results.compressed.length > 10) {
    console.log(`   ... and ${results.compressed.length - 10} more`);
  }

  console.log(`\n🔄 PNGs Converted to WebP: ${results.converted.length}`);
  results.converted.forEach((r) => {
    console.log(`   ${path.basename(r.file)} → ${path.basename(r.newFile)}`);
    console.log(`      ${r.before}KB → ${r.after}KB (saved ${r.saved}%)`);
  });

  console.log(`\n⏭️ Skipped (already optimized): ${results.skipped.length}`);

  if (results.errors.length > 0) {
    console.log(`\n⚠️ Errors: ${results.errors.length}`);
    results.errors.forEach((e) => {
      console.log(`   ${e.file}: ${e.error}`);
    });
  }

  console.log('\n📊 TOTAL SAVINGS\n');
  const totalSaved = totalBefore - totalAfter;
  const percentSaved = ((totalSaved / totalBefore) * 100).toFixed(1);
  console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(1)}MB`);
  console.log(`After:  ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
  console.log(`Saved:  ${(totalSaved / 1024 / 1024).toFixed(1)}MB (${percentSaved}%)\n`);

  if (results.converted.length > 0) {
    console.log('⚠️ PNG → WebP FILES RENAMED\n');
    console.log('Update these references in your code:\n');
    results.converted.forEach((r) => {
      const oldName = path.basename(r.file);
      const newName = path.basename(r.newFile);
      console.log(`  Find: ${oldName}`);
      console.log(`  Replace with: ${newName}\n`);
    });
  }
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
