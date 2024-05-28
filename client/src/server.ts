import express from 'express';
import bodyParser from 'body-parser';
import userRoute from '../../server/src/api/routes/userRoute'; // Make sure the path to your routes file is correct
import boardRoute from '../../server/src/api/routes/boardRoute';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/api/routes/userRoute', userRoute); // Using '/api' as the base path for all routes
app.use('/api/routes/boardRoute', boardRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});