const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use((req, res) => {
    res.status(404).send();
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
