const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());

// Use CORS middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend.vercel.app'],
  methods: ['GET','POST','PATCH','DELETE'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true // if you send cookies/auth headers
}));

app.use(authRoutes);
app.use('/events', eventRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Server running');
});
