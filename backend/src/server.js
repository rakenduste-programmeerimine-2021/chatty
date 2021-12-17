const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()
const PORT = process.env.PORT || 3000

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const chatRoutes = require('./routes/chat');

const app = express();
app.use(express.json());

app.use(cors());

app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('*', (req, res) => {
  res.send('This route does not exist')
})

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })

module.exports = app;