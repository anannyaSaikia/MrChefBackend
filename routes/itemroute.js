const { Router } = require("express");

const itemRouter = Router();

itemRouter.get("/menu", (req, res)=>{
    res.send({msg : "Inside items menu"})
})

itemRouter.get("/contact", (req, res)=>{
    res.send({msg : "Inside contact"})
})

itemRouter.get("/about", (req, res)=>{
    res.send({msg : "Inside about"})
})

itemRouter.get("/CategoryDetails/:item", (req, res)=>{
    const {item} = req.params.item;
    res.send({msg : `Inside category ${item}`})
})

itemRouter.get("/cart", (req, res)=>{
    res.send({msg : "Inside cart"})
})

itemRouter.get("/checkout", (req, res)=>{
    res.send({msg : "Inside checkout"})
})

module.exports = { itemRouter };