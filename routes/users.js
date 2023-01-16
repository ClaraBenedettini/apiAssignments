// Aidé par Corentin Lizy pour l'authentification et l'utilisation de Bcrypt.

let Users = require('../model/users');
const BCrypt = require('bcrypt');

// Se connecter
const login = async (req, res) => {
    let login = req.body.login;
    let password = req.body.password;

    Users.findOne({ login: login }, async (err, user) => {
        if (err) { res.send(err) }
        if (user) {
            if (await BCrypt.compare(password, user.mdp)) {
                user.mdp = undefined;
                res.send(user);
            } else {
                res.send("Mot de passe incorrect");
            }
        }
    })
}

module.exports = { login};