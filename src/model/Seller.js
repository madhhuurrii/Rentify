const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
    {
        propname: { type: String, require: true },
        address: { type: String, require: true },
        bedroom: { type: Number, require: true },
        bathroom: { type: Number, require: true },
        landmark: { type: String, require: true },
        email: { type: String, require: true },
        price: { type: Number, require: true },
        desc: { type: String, require: true },
        count: {type: Number, require: true }

        // confirm: { type: String, require: true },
    },
    { collection: "sellers" }
);
const model = new mongoose.model("sellerSchema", sellerSchema);

module.exports = model;