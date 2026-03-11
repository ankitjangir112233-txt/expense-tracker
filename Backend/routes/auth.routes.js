const authMiddleware = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);

router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "You are authorized",
        userId: req.userId
    });
});

module.exports = router;

// const express = require("express")
// const router = express.Router();

// const { register, login } = require("../controllers/auth.controller");

// router.post("/register", (req,res) => {
//     const user = {
//         username : req.body.username,
//         email : req.body.email,
//         password : req.body.password
//     };

//     register(req,res);

//     console.log("User Registered!")
// });

// router.post("/login", (req,res) => {
//     const user = {
//         email : req.body.email,
//         password : req.body.password
//     };

//     login(req,res);
// });

// module.exports = router;