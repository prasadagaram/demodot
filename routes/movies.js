let MovieSchema = require("../models/movies");
let request = require("request");

let addMovie = function(req,res){
    let movie = new MovieSchema({
        name:"Pearl Harbour",
        year:1992
    });
    movie.save(function(err,data){
        if(err){
            res.send({status:"failure",message:"Error in adding" });
        }else{
            res.send({status:"success",message:"Added new movie"});
        }
    });
}


let getMovieByName = function(req,res){
    let uri = 'http://www.omdbapi.com/?t=' + req.params.name + '&apikey=5a572121';
    let reqData = req.params.name.toString();
    console.log(reqData);
    MovieSchema.findOne({name:{"$regex": reqData, "$options": "i"}}, function(err,data){
        if(err){
            res.send({status:"success", message:"error in fetcing data"});
        } 
        if(data!=null || data != undefined){
            console.log("db fetch");
            res.send({status:"success", data:data });
        }else{           
            request(uri, {json:true}, function(err,resp, body){
                if(err){
                    res.send({status:"failure",message:"Movie not present in local and Web"});
                }
                let newMovie = new MovieSchema({
                    name: body.Title,
                    year: body.Year,
                    director: body.Director,
                    imdbRating: body.imdbRating,
                    raw: body.toString()
                });
                newMovie.save(function(err,data){
                    if(err){
                        console.log(err);
                        res.send({status:"failure",message:"db error on savng"});
                    }else{
                        console.log("api fetch");
                        res.send({status:"success",data:data});
                    }
                });
            });
        }
    });
}


module.exports.route = function(router){
    router.post('/movie/add', addMovie);
    router.get('/movie/:name',getMovieByName);
}
