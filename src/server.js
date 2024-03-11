const express = require("express");
const app = express();
const shortURL = require("./mongoDB");

app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", async (req, res)=>{
    const shortUrls = await shortURL.find()
    res.render("index", {shortUrls: shortUrls});
});

app.post("/shortUrls", async (req, res)=>{
    await shortURL.create({full: req.body.fullurl});
    res.redirect("/");
});

app.get("/:shortUrl", async (req, res)=>{
    const shortUrl = await shortURL.findOne({short: req.params.shortUrl});
    if (shortUrl == null) {
        return res.sendStatus(404);
    }
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
});

app.listen(3000, ()=>{
    console.log("port connected");
});