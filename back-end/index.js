const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const bcrypt = require("bcrypt");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.set("port", 3001);
app.use(cors());
mongoose
    .connect(
        "mongodb+srv://admin-Pentavalent:Nosotroscinco@cluster0.vuo1v.mongodb.net/Elan?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Coudn't connect MongoDB....", err));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        ciphers: "SSLv3",
    },
});
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
});
const User = new mongoose.model("User", userSchema);
const verifySchema = new mongoose.Schema({
    email: String,
    otp: String,
});
const Verify = new mongoose.model("Verify", verifySchema);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
// function createAdmin(email, password, req, res) {
//   console.log("Vandhutten");
//   const user = new User({
//     email: email,
//     password: password,
//   });
//   admin.save(function (err) {
//     if (err) console.log("Error in adding new item");
//     else {
//       const store = new Store({
//         store_owner: admin._id,
//       });
//       store.save(function (err) {
//         if (err) console.log("Error in adding new item");
//         else {
//           Admin.findOne({ admin_email: email }, (err, found) => {
//             if (!err) {
//               console.log("Yes here");
//               found.store_id = store._id;
//               res.redirect(
//                 307,
//                 "/login?admin=" + true + "&password=" + password
//               );
//               found.save();
//             }
//           });
//         }
//       });
//     }
//   });
// }
app.post("/signup", (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const pass = req.body.password;
    if (email && pass) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(pass, salt, function (err, hash) {
                if (!err) {
                    console.log("Hi");
                    const user = new User({
                        email: email,
                        password: hash,
                    });
                    user.save();
                    res.send(307, "/login?admin=" + true + "&password=" + hash);
                } else res.send("error in hash gen");
            });
        });
    } else
        return res.status(403).json({
            message: "Problem in signing up",
        });
});
app.post("/verify", (req, res) => {
    Verify.deleteMany({ email: req.body.email }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("deleted");
        }
    });
    console.log(req.body);
    var random = randomString(
        6,
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    const user = new Verify({
        email: req.body.email,
        otp: random,
    });
    user.save();
    var mailOptions = {
        from: process.env.SMTP_USER,
        to: req.body.email,
        subject: "Verify your email address",
        text:
            "To finish setting up your account, we just need to make sure this email address is yours.",
        html:
            "<div>To verify your email address use this security code: '" +
            random +
            "'</div>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
});
app.post("/otp-verify", (req, res) => {
    Verify.findOne({ email: req.body.email }, (err, found) => {
        if (!err) {
            if (found.otp == req.body.otp) {
                res.status(200).send("verified machi");
            } else {
                res.send("OTP incorrect");
            }
        } else {
            res.send("Email not found");
        }
    });
});

app.get("/", (req, res) => {
    res.send("object");
});
app.listen(app.get("port"), function () {
    console.log(`App started on port ${app.get("port")}`);
});