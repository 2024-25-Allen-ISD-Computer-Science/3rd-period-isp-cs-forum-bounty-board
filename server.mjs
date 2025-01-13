import express from "express";

const app = express();
const port = 2025;

app.get('/', (req, res) => {
    res.send('<h1>Hey, it works!</h1>')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});