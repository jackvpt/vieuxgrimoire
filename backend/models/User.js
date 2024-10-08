/** Imports */
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

/** Create Schema */
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

/** Check if Schema is unique */
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)
