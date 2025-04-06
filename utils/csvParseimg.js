import { Readable } from 'stream';
import csv from 'csv-parser';

/**
 * Parses CSV data from a buffer.
 *
 * @param {Buffer} buffer - Buffer containing CSV file contents.
 * @returns {Promise<Array>} - Promise resolving to the parsed data.
 */
export const parseCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = Readable.from(buffer);

    stream
      .pipe(csv())
      .on('data', (data) => {
        // Validate each row's structure
        if (data['Serial Number'] && data['Product Name'] && data['Input Image Urls']) {
          results.push(data);
        } else {
          console.error('❗ Invalid CSV format in row:', data);
        }
      })
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};
