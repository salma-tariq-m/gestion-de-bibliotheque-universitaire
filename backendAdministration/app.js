const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/students");
// const professorRoutes = require("./routes/professors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/students", studentRoutes);
// app.use("/professors", professorRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});