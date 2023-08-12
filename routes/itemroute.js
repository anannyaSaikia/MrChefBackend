const { Router } = require("express");
const { ItemModel } = require("../models/Item.model");
const { CartModel } = require("../models/Cart.model");

const itemRouter = Router();

itemRouter.get("/menu", (req, res) => {
    res.send({ msg: "Inside items menu" })
})

itemRouter.get("/contact", (req, res) => {
    res.send({ msg: "Inside contact" })
})

itemRouter.get("/about", (req, res) => {
    res.send({ msg: "Inside about" })
})

itemRouter.get("/CategoryDetails/:category", async (req, res) => {
    const { category } = req.params.category;
    const q = req.query;
    try {
        const result = await ItemModel.find({$or : [{name : {$regex : q, $options : "i"}}, { category: category }]});
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({msg : "Error getting category data, please try again later!"})
    }
    /* res.send({msg : `Inside category ${item}`}) */
})

itemRouter.get("/cart", async (req, res) => {
    //authorize user (realtionship maintenance)
    const user_id = req.user_id;
    try {
        const cartItems = await CartModel.find({user_id : user_id});
        res.status(200).send(cartItems);
    } catch (error) {
        res.status(500).send({msg : "Error getting cart items, try again later!"})
    }
    
    /* res.send({ msg: "Inside cart" }) */
})

itemRouter.get("/checkout", (req, res) => {
    res.send({ msg: "Inside checkout" })
})

module.exports = { itemRouter };