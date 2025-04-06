import { v4 as uuidv4 } from 'uuid';
import { parseCSV } from '../utils/csvParseimg.js';
import Request from '../proModels/reqModel.js';

export const handleUpload = async (req, res) => {
  console.log("📥 Upload handler triggered");
  if (!req.file) {
    console.log(" No file received");
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    console.log(" Received file:", req.file.originalname);

    // Pass the in-memory buffer directly
    const records = await parseCSV(req.file.buffer);
    console.log(" CSV parsed successfully:", records);

    const requestId = uuidv4();
    console.log(" Generated requestId:", requestId);

    const requests = records.map(record => ({
      requestId,
      productName: record['Product Name'],
      images: record['Input Image Urls'].split(',').map(url => ({
        inputUrl: url.trim(),
        status: 'pending',
      })),
      status: 'pending',
    }));

    console.log(" Final documents to insert:", JSON.stringify(requests, null, 2));

    await Request.insertMany(requests);

    console.log(" Inserted records to DB");

    res.status(202).json({ requestId });
  } catch (error) {
    console.error(" Error during upload:", error);
    res.status(500).json({ error: 'Error processing file' });
  }
};
