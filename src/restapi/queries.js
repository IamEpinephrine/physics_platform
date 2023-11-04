const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id=$1";
const checkEmailExists = "SELECT u FROM users u WHERE u.email=$1";
const checkLoginExists = "SELECT u FROM users u WHERE u.login=$1";
const addUser = "INSERT INTO users (firstname, surname, email, login, role) VALUES ($1, $2, $3, $4, $5)";
const deleteUserById = "DELETE FROM users where id = $1";
const updateUserById = "UPDATE users SET name = $1 WHERE id = $2";

const addModel = "INSERT INTO models (name, creator, creation_date, status, image, model_path, image_path) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const getModelById = "SELECT * FROM models WHERE id=$1 ORDER BY id DESC LIMIT 1";
const getModels = "SELECT * FROM models";

const addImage = "INSERT INTO images (path) VALUES ($1) RETURNING id";
const getImageById = "SELECT * FROM images WHERE id=$1";

module.exports = {
    getUsers,
    getUserById,
    addUser,
    checkLoginExists,
    checkEmailExists,
    deleteUserById,
    addModel,
    updateUserById,
    getModelById,
    getModels,
    addImage,
    getImageById
}