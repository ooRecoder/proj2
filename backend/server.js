require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler')
const helmet = require('helmet');
const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes')

const app = express();
app.use(helmet());
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'API rodando com sucesso' });
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
  });
});