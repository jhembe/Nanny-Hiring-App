const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const nannyRoutes = require('./routes/nannyRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const employerRoutes = require('./routes/employerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('MongoDB connected');
// }).catch((error) => {
//   console.error('MongoDB connection error:', error);
// });

app.use('/api/auth', authRoutes);
app.use('/api/nannies', nannyRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
