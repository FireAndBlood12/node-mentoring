import express from 'express';
// eslint-disable-next-line no-unused-vars
import { Application } from 'express';
import userRouter from './routers/users';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

const port: number = Number(process.env.SERVER_PORT) || 3000;

app.use(express.json());
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World tttt!');
});


app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
