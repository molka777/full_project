const express = require("express");
const connectDB = require("./config/dbConnect");
const user = require("../backend/services/userService/Routes/user");
const experienceRouter = require("../backend/services/experienceService/Routes/experienceRouter");
const fileUpload = require("express-fileupload");

const app = express();
app.use(express.json());
app.use("/user", user);
app.use("/api", experienceRouter);
app.use(fileUpload());

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running on PORT ${PORT}`)
);

// // Upload Endpoint
// app.post("/upload", (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: "No file uploaded" });
//   }

//   const file = req.files.file;

//   file.mv(`${__dirname}../../client/public/uploads/${file.name}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });
// });

// app.listen(5001, () => console.log("Server Started..."));
