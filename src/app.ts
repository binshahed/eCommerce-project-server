import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/router/router';

const app = express();

app.use(express.json());
app.use(cors());

// router
router(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
