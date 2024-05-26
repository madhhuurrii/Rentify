const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstname: { type: String, require: true },
        lastname: { type: String, require: true },
        mobile: { type: Number, require: true },
        email: { type: String, require: true },
        profile: { type: String, require: true },
        password: { type: String, require: true },
        // confirm: { type: String, require: true },
    },
    { collection: "users" }
);
const model = new mongoose.model("userSchema", userSchema);

module.exports = model;