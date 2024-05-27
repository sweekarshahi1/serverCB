import express from 'express';
import cors from 'cors';
import axios from 'axios'; // Ensure Axios is imported
import adminRoute from './routes/adminRoutes.js';
import userRoute from './routes/userRoutes.js';
import createMerchandiseRoute from './routes/merch.js';
import connectdb from './dbconfig/connectdb.js';
import getAllMerch, { getMerchbyId } from './controllers/getAllMerch.js';

const app = express();

// Connect to the database
connectdb();

// Middleware
app.use(cors({
  origin: ['http://localhost:5174','http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/user', userRoute);

app.post('/api/v1/merch/create', createMerchandiseRoute); 
app.use('/api/v1/get-all-merch', getAllMerch);
app.use('/api/v1/get-merch-id/:id', getMerchbyId);
app.use('/uploads', express.static('uploads'));

// Khalti payment initiation endpoint
app.post('/api/khalti/initiate', async (req, res) => {
  const payload = req.body;
  console.log('Received payload:', payload);

  try {
    const response = await axios.post(
      'https://a.khalti.com/api/v2/epayment/initiate/',
      payload,
      {
        headers: {
          'Authorization': `Key 057952c55a814d9691ef319dc8309e90`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Khalti API response:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error initiating Khalti payment:', error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request data:', error.request);
      res.status(500).json({ error: 'No response received from Khalti API' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
