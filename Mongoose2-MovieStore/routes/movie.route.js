const express = require("express");
const MovieModel = require("../model/movie.model");

const movieRouter = express.Router();

// movieRouter.get('/get-movies',async (req,res)=>{
//     const data = await MovieModel.find();
//     res.status(200).json({msg:"data",data})
// })

//Filter by title.
// movieRouter.get(`/get-movies/?title=${}`,(req,res)=>{
//     console.log(req.params);
// })

movieRouter.get('',async (req, res) => {
    const { rating, q, _sort,_order, page, limit} = req.query; // Extract the title query parameter
    const filter = {};

    if (q) {
        filter.title = { $regex: q, $options: 'i' };
    }

    if (rating) {
        filter.rating = { $gte: rating };
    }

    const sortBy = {}
    if(_sort){
        sortBy[_sort] = _order==='desc'? -1 : 1;
    }
    
    let skip;
    if(page==1 || page==undefined){
        skip = 0;
    }
    else{
        // decrementing page by 1 because if page is 2 it will skip 4 but we want it to skip only 2 so to get correct result we are decreamenting by 1. 
        skip = Number(page-1) * Number(limit || 2);
    }






    // console.log(sortBy)

    // console.log(filter);
    /* Now if query has both q and rating 
        Then filter will be like this:
        filter = {
            title:{$regex:title_name,$options:"i"},
            rating:{$gte:rating_value}
        }    

        In this query rating value will be stored in string so to convert it to number we will use parseFloat.

        query will be :-> Model.find(filter) ==> await Model.find({title: { '$regex': 'dhoom', '$options': 'i' },rating: { '$gte': parseFloat('8') }})
    
    */


    try {
        const movies = await MovieModel.find(filter).sort(sortBy).skip(skip).limit(Number(limit || 2));
        res.json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching movies' });
    }

});



movieRouter.post('/add-movie', async (req, res) => {
    try {
        const movie = new MovieModel(req.body);
        // console.log(movie)
        await movie.save()
        res.status(201).json({ msg: "Movie added Successfully" })
    } catch (error) {
        console.log("Error connecting DB", error);
    }


})

movieRouter.patch('/update-movie/:id', async (req, res) => {
    const id = req.params.id;
    await MovieModel.findByIdAndUpdate(id, req.body);
    res.status(202).json({ msg: "Movie updated successfully" })
})

movieRouter.delete('/delete-movie/:id', async (req, res) => {
    const id = req.params.id;
    await MovieModel.findByIdAndDelete(id);
    res.status(204).json({ msg: "Movie deleted from database" });
})

module.exports = movieRouter;