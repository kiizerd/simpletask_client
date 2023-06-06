// scripts/countImages.js
// This script will write the number of images in the /public/1k/ directory
// to a file as an exported number for use in the client app
// Script will be executed in prebuild phase.
// Run `yarn prebuild` if export needed

const fs = require("fs");
const path = require("path");

const imagesDirectory = path.join(__dirname, "../public/1k");

fs.readdir(imagesDirectory, (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  const imageCount = files.filter(
    (file) => file.endsWith(".jpg") || file.endsWith(".png")
  ).length;

  fs.writeFile(
    "./src/imageCount.ts",
    `// File created in pre-build phase\nexport default ${imageCount};\n`,
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
      }
    }
  );
});
