import axios from 'axios';
import sharp from 'sharp';
// import fs from 'fs';
import path from 'path';

/**
 * Downloads and compresses an image.
 * @param {string} imageUrl - URL of the image to process.
 * @param {string} outputDir - Directory to save the processed image.
 * @returns {Promise<string>} - Promise resolving to the path of the processed image.
 */
export const processImage = async (imageUrl, outputDir) => {
  try {
    const response = await axios({
      url: imageUrl,
      responseType: 'arraybuffer',
    });

    const imageName = path.basename(imageUrl);
    const outputFilePath = path.join(outputDir, imageName);

    await sharp(response.data)
      .jpeg({ quality: 50 })
      .toFile(outputFilePath);

    return outputFilePath;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};
