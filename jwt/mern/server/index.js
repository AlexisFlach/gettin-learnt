const express = require('express')
const connectDb = require('./config/db')
const usersRouter = require('./routes/api/users')
const authRouter = require('./routes/api/auth')
const app = express();

connectDb()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on ${PORT}`))