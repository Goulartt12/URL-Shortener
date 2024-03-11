const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/shortUrls")
.then(()=>{
    console.log("mongo connected")
})
.catch(()=>{
    console.log("failed to connect")
});

const shortid = require("shortid");

const urlSchema = mongoose.Schema({
    full:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: shortid.generate
    },
    clicks:{
        type: Number,
        required: true,
        default: 0
    }
})

const shortURL = mongoose.model("Urls", urlSchema);
module.exports = shortURL;