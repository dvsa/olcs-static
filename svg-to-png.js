const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = process.argv[2];
const outputDir = process.argv[3];

let failedImages = []

if (!inputDir || !outputDir){
  console.error('Please provide input & output directories.');
  process.exit(1);
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading input directory.', err);
    process.exit(1);
  }

  files.forEach(file =>{
    // Check file extension
    if (path.extname(file).toLowerCase() === '.svg') {
      // Convert
      const inputFilePath = path.join(inputDir, file);
      const outputFilePath = path.join(outputDir, path.basename(file, '.svg') + '.png')

      sharp(inputFilePath).png().toFile(outputFilePath)
        .catch(err => {
          console.error(`Error converting ${file}.`, err);
          failedImages.push(file)
        });
    }
  });
  if (failedImages.length === 0){
    console.log('Images converted.');
  } else {
    console.log(`${failedImages.length} image(s) failed to convert. See previous logs.`);
  }
});