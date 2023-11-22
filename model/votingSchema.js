const mongoose = require("mongoose");
const votingSchema = new mongoose.Schema({
    "name": {type:String},
    "votes": {type:Number}
},{
    collection: "parties"
})

module.exports = mongoose.model("votingSchema",votingSchema);