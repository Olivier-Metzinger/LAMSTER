const express = require("express");
const app = express();
const port = 3001;
const users_model = require("./users_model");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Access-Control-Allow-Headers"
    );
    next();
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("We need a token");
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({
                    auth: false,
                    message: "You failed to authenticate",
                });
            } else {
                req.userId = decoded.userId;
                next();
            }
        });
    }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
    res.send("You are, authenticated");
});

app.get("/", (req, res) => {
    users_model
        .getUsers()
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

app.post("/register", (req, res) => {
    users_model
        .createUsers(req.body)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

app.post("/login", (req, res) => {
    users_model
        .loginUsers(req.body)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            res.status(401).send(error);
        });
});

app.post("/forget", (req, res) => {
    users_model
        .passwordForget(req.body)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            res.status(401).send(error);
        });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
