/** Imports  */
require("dotenv").config() /** Load environnement variables from .env file to process.env */
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

/** Check password validity */
const isValidPassword = (password) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)

    return (
        password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars
    )
}

/** Create new User */
exports.signup = async (req, res, next) => {

    if (!isValidPassword(req.body.password)) { /** Check password validity */
        return res
            .status(400)
            .json({ error: "Password is not valid (8 characters minimum with 1 uppercase, 1 lowercase, 1 number and 1 special character among !@#$%^&*()_+{}) !" });
    }

    try {
        const hash = await bcrypt.hash(req.body.password, 10) /** Hash password with bcrypt (10 for number of algorithm loops) */
        const user = new User({  /** Create User with hashed password */
            email: req.body.email,
            password: hash
        });
        await user.save() /** Save new User */
        res.status(201).json({ message: "New user created" })
    } catch (error) {
        res.status(500).json({ error })
    }

};

/** Log-in User */
exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }) /**  Search User */

        if (!user) {
            return res.status(401).json({ message: "UserID/Password incorrect" })
        }
        const valid = await bcrypt.compare(req.body.password, user.password) /** Compares hashed entered password with hashed stored password */

        if (!valid) {
            return res.status(401).json({ error: "UserID/Password incorrect" })
        }
        res.status(200).json({ /** Returns JSON with userId and token */
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                process.env.SECRET_TOKEN, /** Secret key used for encoding token */
                { expiresIn: '24h' }
            )
        });
    } catch (error) {
        res.status(500).json({ error })
    }

}



// exports.login = (req, res, next) => {
//     User.findOne({ email: req.body.email }) /**  Search User */
//         .then(user => {
//             if (!user) {
//                 return res.status(401).json({ message: "UserID/Password incorrect" })
//             }
//             bcrypt.compare(req.body.password, user.password) /** Compares hashed entered password with hashed stored password */
//                 .then(valid => {
//                     if (!valid) {
//                         return res.status(401).json({ error: "UserID/Password incorrect" })
//                     }
//                     res.status(200).json({ /** Returns JSON with userId and token */
//                         userId: user._id,
//                         token: jwt.sign(
//                             { userId: user._id },
//                             process.env.SECRET_TOKEN, /** Secret key used for encoding token */
//                             { expiresIn: '24h' }
//                         )
//                     });
//                 })
//                 .catch(error => res.status(500).json({ error }))
//         })
//         .catch(error => res.status(500).json({ error }))
// }
