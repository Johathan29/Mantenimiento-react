import express from 'express';
import cors from 'cors';
import userRoutes from './routes/message.js';

const app = express();
const PORT = 3306;

app.use(cors());
app.use(express.json());
app.use('/api/messages', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend escuchando en http://localhost:${PORT}`);
});