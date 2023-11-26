const pool = require('../../db');
const queries = require('./queries');
const path = require("path");
const bcrypt = require("bcrypt");
const {createTokens} = require('./JWT');

/* CRUDs for USERS table */
const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};

const addUser = (req, res) => {
    const {firstname, surname, email, login, role} = req.body;
    //check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send("Email already exists.");
        }

        //check if email exists
        pool.query(queries.checkLoginExists, [login], (error, results) => {
            if (results.rows.length) {
                res.send("Login already exists.");
            }


            pool.query(queries.addUser, [firstname, surname, email, login, role], (error, results) => {
                    if (error) throw error;
                    res.status(201).send("User added successfully.");
                    console.log("User added successfully.");
                }
            );
        });
    });
};

const deleteUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound) {
            res.send("User doesn't exist.");
        }
        pool.query(queries.deleteUserById, [id], (error, results) => {
            if(error) throw error;
            res.status(200).send("User deleted successfully.");
        })
    })
};

const updateUserById = (res, req) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if(noUserFound) {
        res.send("User doesn't exist.");
    }
    pool.query(queries.updateUserById, [name, id], (error, results) => {
        if (error) throw error;
        response.status(200).send("Update successful.");
    })
    })
}

/* CRUDs for MODELS table */

const getAcceptedModels = (req, res) => {
        pool.query(queries.getAcceptedModels, (error, results) => {
            if(error) throw error;
            res.status(200).json(results.rows);
        })
};

const getCommunityModels = (req, res) => {
    //if (req.role === 'A') {
        pool.query(queries.getCommunityModels, (error, results) => {
            if(error) throw error;
            res.status(200).json(results.rows);
        })
    //} else {
      //  res.status(401).json({error: "Not authorized."})
    //}
};

const getModels = (req, res) => {
    //if (req.role === 'A') {
    pool.query(queries.getModels, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
    //} else {
    //  res.status(401).json({error: "Not authorized."})
    //}
};

const addModel = (req, res, next) => {
    var _validFileExtensions = ["js", "gltf", "html", "jsx"];
    const {name, creator = 'Admin', creation_date = new Date(), status = 'U', icon = req.files.icon, model = req.files.model} = req.body;
    const ipath = path.join('/uploads/images/' + icon.name);
    const mpath = path.join('/uploads/models/' + model.name);
    var fileExt = model.name.split('.').pop();

    if(!_validFileExtensions.includes(fileExt)) {
        res.status(400).json({error: "Invalid file extension."})
    } else {
        icon.mv(path.join(__dirname + 'http:/../../public/uploads/images/' + icon.name), function(err, result) {
            if(err)
                throw err;
        })

        model.mv(path.join(__dirname + '/../../public/uploads/models/' + model.name), function(err, result) {
            if(err)
                throw err;
        })

        pool.query(queries.addImage, [ipath], (error, results) => {
                if (error) throw error;
                console.log("Image added successfully.");
                const image = results.rows[0].id;
            pool.query(queries.addModel, [name, creator, creation_date, status, image, mpath, ipath, fileExt], (error, results) => {
                            if (error) throw error;
                            res.status(201).send("Model added successfully.");
                            console.log("Model added successfully.");
                        }
                    );
            }
        );
    }
}

const getModelById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getModelById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows[0]);
    })
};

const deleteModelById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getModelById, [id], (error, results) => {
        const noModelFound = !results.rows.length;
        if(noModelFound) {
            res.send("Model doesn't exist.");
        }
        pool.query(queries.deleteModelById, [id], (error, results) => {
            if(error) throw error;
            res.status(200).send("Model deleted successfully.");
        })
    })
};

const acceptModelById = (req, res) => {
    const id = parseInt(req.params.id);
    const status = "A";
    pool.query(queries.getModelById, [id], (error, results) => {
        const noModelFound = !results.rows.length;
        if(noModelFound) {
            res.send("Model doesn't exist.");
        }
        pool.query(queries.updateModelById, [status, id], (error, results) => {
            if (error) throw error;
            response.status(200).send("Update successful.");
        })
    })
}

const rejectModelById = (req, res) => {
    const id = parseInt(req.params.id);
    const status = "R";
    pool.query(queries.getModelById, [id], (error, results) => {
        const noModelFound = !results.rows.length;
        if(noModelFound) {
            res.send("Model doesn't exist.");
        }
        pool.query(queries.updateModelById, [status, id], (error, results) => {
            if (error) throw error;
            response.status(200).send("Update successful.");
        })
    })
}

const getImageById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getImageById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};

const register = (req, res) => {
    const {firstname, surname, password, email, login, role = 'S'} = req.body;

    bcrypt.hash(password, 10,).then((hash => {
        pool.query(queries.checkEmailExists, [email], (error, results) => {
            if (results.rows.length) {
                res.send("Email already exists.");
            }
            else {
                //check if email exists
                pool.query(queries.checkLoginExists, [login], (error, results) => {
                    if (results.rows.length) {
                        res.send("Login already exists.");
                    }
                    else {
                        pool.query(queries.addUser, [firstname, surname, hash, email, login, role], (error, results) => {
                                if (error) throw error;
                                res.status(201).send("User registered.");
                                console.log("User registered.");
                            }
                        );
                    }
                });
            }
        });
    }))
}

const login = (req, res) => {
    const {username, password} = req.body;
    pool.query(queries.getUserByLogin, [username], (error, results) => {
        if (results.rows.length===0) {
            res.status(400).send({error: "Login doesn't exist."});
        }
        else {
            console.log(results.rows[0]);
            const user = results.rows[0];
            const dbPassword = user.password;
            bcrypt.compare(password, dbPassword).then((match) => {
                if (!match) {
                    res.status(400).json({error: "Wrong username or password"})
                } else {
                    const accessToken = createTokens(user);
                    res.cookie("access-token", accessToken, {
                        maxAge: 60*60*1000,
                        httpOnly: true
                    })
                    switch (username) {
                        case "Marcin":
                            res.status(200).json(`Przed państwem podejście do dedykacji numer jeden \n Dla kolegi, który motywację daje mi w potrzebie \n Nie mogłam napisać tej pracy cały Boży rok \n Przyszedł Marcin i powiedział że dla niego OK`);
                        break;
                            default:
                            res.status(200).json('User logged in.');
                    }
                }
            })
        }
    })
}

const myProfile = (req, res) => {
    res.json({id: req.userId, username: req.userName, role: req.role});
}

const logout =  (req, res) => {
    return res.clearCookie("access-token").status(200).json({message: "Logged out successfully."});
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUserById,
    addModel,
    updateUserById,
    getModelById,
    getModels,
    getCommunityModels,
    getAcceptedModels,
    deleteModelById,
    acceptModelById,
    rejectModelById,
    getImageById,
    register,
    login,
    myProfile,
    logout
};
