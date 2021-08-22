const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//CONFIG DB
const Pool = require("pg").Pool;
const pool = new Pool({
    user: "my_user",
    host: "localhost",
    database: "my_database",
    password: "root",
    port: 5432,
});

//RECUPERE LA LISTE DES USERS
const getUsers = () => {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * from users", (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
            console.log(results.rows);
        });
    });
};

//CREATION DE L'UTILISATEUR
const createUsers = (body) => {
    return new Promise(function (resolve, reject) {
        const { firstname, lastname, mail, password } = body;
        //HASH PASSWORD
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.log(err);
            }

            pool.query(
                "INSERT INTO users (firstname, lastname, mail, password) VALUES ($1, $2, $3, $4)",
                [firstname, lastname, mail, hash],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(`Account created`);
                    }
                }
            );
        });
    });
};

const loginUsers = (body) => {
    return new Promise(function (resolve, reject) {
        const { mail, password } = body;
        pool.query(
            "SELECT * FROM users WHERE mail = $1",
            [mail],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results.rows.length > 0) {
                    bcrypt.compare(
                        password,
                        results.rows[0].password,
                        (error, response) => {
                            if (response) {
                                //JWT
                                let json = {};
                                const id = results.rows[0].id;
                                const token = jwt.sign({ id }, "jwtSecret", {
                                    expiresIn: 300,
                                });
                                json = {
                                    auth: true,
                                    token: token,
                                    results: results,
                                };
                                resolve(json);
                            } else {
                                json = {
                                    auth: false,
                                    message:
                                        "Nom de compte ou mot de passe incorrect",
                                };
                                resolve(json);
                            }
                        }
                    );
                } else {
                    json = {
                        auth: false,
                        message: "Aucun utilisateur existant",
                    };
                    resolve(json);
                }
            }
        );
    });
};

const passwordForget = (body) => {
    return new Promise(function (resolve, reject) {
        const { mail } = body;
        pool.query(
            "SELECT * FROM users WHERE mail = $1 ",
            [mail],

            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results.rows.length > 0) {
                    resolve(`Mail found`);
                } else {
                    reject(`Mail incorrect`);
                }
            }
        );
    });
};

module.exports = {
    getUsers,
    createUsers,
    loginUsers,
    passwordForget,
};
