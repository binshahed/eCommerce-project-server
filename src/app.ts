import express from 'express';
import cors from 'cors';
import router from './app/router/router';

const app = express();

app.use(express.json());
app.use(cors());

// router
router(app);

export default app;
