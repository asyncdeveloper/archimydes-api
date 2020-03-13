import app from './app'

const PORT = process.env.APP_PORT || 3001;

app.express.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
