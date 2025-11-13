import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.json({message: 'Backend server is running!'});
});

app.get('/api/health', (req, res) => {
	res.json({status: 'ok', timestamp: new Date().toISOString()});
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
