import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import uploadRoutes from './routes/uploadRoutes.js'
import statusRoutes from './routes/statusRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/status', statusRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(' MongoDB connected'))
.catch(err => console.error('Connection error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
