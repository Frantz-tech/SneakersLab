import express from 'express';
import cors from "cors";
import { PORT } from './config.js';
import { routes } from './routes/routes.js';

const app = express();
app.use(express.json());
app.use(cors());
routes(app);
app.listen(PORT);

console.log(`Server on http://localhost:${ PORT }`);

