const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors
const attendanceRoutes = require('./routes/attendance');
const userRoutes = require('./routes/user');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Usar cors

// MongoDB connection
const uri = 'mongodb+srv://miguelnontol99:zGeEJwEA7ZOx2Rev@clustera.elib0.mongodb.net/?retryWrites=true&w=majority&appName=ClusterA';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.use('/attendance', attendanceRoutes);
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
