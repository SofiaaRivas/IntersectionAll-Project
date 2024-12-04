const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://sofiarivas6253:sofiarivas6253@cluster0.366na.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=Cluster0';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define Marker Schema
const markerSchema = new mongoose.Schema({
  user_id: String,
  marker_type_id: Number,
  marker_category: String,
  width: Number,
  incline: Number,
  surface: String,
  reliability: Number,
  details: String,
  latitude: Number,
  longitude: Number,
}, { timestamps: true });

const Marker = mongoose.model('Marker', markerSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Marker Backend with MongoDB is running');
});

app.post('/markers', async (req, res) => {
  try {
    const marker = new Marker(req.body);
    const savedMarker = await marker.save();
    res.status(201).json({ message: 'Marker added successfully', marker: savedMarker });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save marker' });
  }
});

app.get('/markers', async (req, res) => {
  try {
    const markers = await Marker.find();
    res.json(markers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve markers' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
