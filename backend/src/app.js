import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import auth from './routes/auth.js';
import movie from './routes/movie.js';
import tv from './routes/tv.js';
import search from './routes/search.js';
import db from './config/db.js';

const app = express();

db()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

app.use("/api/auth", auth);
app.use("/api/movie", movie);
app.use("/api/tv", tv);
app.use("/api/search", search);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

export default app;
