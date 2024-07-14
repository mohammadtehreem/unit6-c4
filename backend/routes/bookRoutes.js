const { Router } = require("express");
const bookModel  = require("../schemas/bookSchema");

const bookRoutes = Router();

bookRoutes.get("/", async (req,res)=>{
    try{   
        // console.log(req.query);

        const result = await bookModel.find(req.query);
        res.json(result);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
})

bookRoutes.get("/:id", async (req,res)=>{
    try{   
        console.log(req.params.id);

        const result = await bookModel.find({_id:req.params.id});
        res.json(result);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
})



bookRoutes.post("/add", async(req, res)=>{
    try{
        const book = new bookModel(req.body);
        await book.save();
        res.sendStatus(201);
    }
    catch(err){
        console.log(err);
        res.send(500)
    }
    
})


module.exports = bookRoutes;