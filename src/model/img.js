var mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String,
        
    },
    email: { type: String, require: true },
});

module.exports = new mongoose.model("Image", imageSchema);