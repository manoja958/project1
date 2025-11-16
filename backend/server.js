// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Connect to MongoDB
// // mongoose.connect('mongodb://localhost:27017/experience-tracker', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // })
// // .then(() => console.log('MongoDB connected'))
// // .catch(err => console.error('MongoDB connection error:', err));

// // // Routes
// // const employeeRoutes = require('./routes/employeeRoutes');
// // app.use('/api/employees', employeeRoutes);


// // // Start Server
// // const PORT = 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const employeeRoutes = require('./routes/employeeRoutes'); // ✅ correct import

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/experience-trackerApp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.error('❌ MongoDB connection failed:', err));

// // Use routes
// app.use('/api/employees', employeeRoutes);

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/experience-trackerApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB connection error:", err));

app.use('/api/employees', employeeRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
