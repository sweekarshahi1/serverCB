import express from 'express';
import cors from 'cors';
import adminRoute from './routes/adminRoutes.js';
import userRoute from './routes/userRoutes.js';
import createMerchandiseRoute from './routes/merch.js';
import connectdb from './dbconfig/connectdb.js';
import getAllMerch, { getMerchbyId } from './controllers/getAllMerch.js'


const app = express();


connectdb();


app.use(cors());
app.use(express.json());


app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/user', userRoute);
app.post('/api/v1/merch/create', createMerchandiseRoute); 



app.use('/api/v1/get-all-merch', getAllMerch);
app.use('/api/v1/get-merch-id/:id',getMerchbyId)

app.use('/uploads', express.static('uploads'));
const PORT = process.env.PORT || 8080;

//listen 
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

