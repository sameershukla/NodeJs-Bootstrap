var express = require('express');
var router = express.Router();

//DB
var mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost:27017/library' );

//Creating Schema
var BookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique:true },
    author: { type: String, required: true },
    releaseDate: Date
});
//Model
var BookModel = mongoose.model( 'Book', BookSchema );


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post( '/books', function( request, response ) {
    console.log("title:"+request.body.title)
    console.log("author:"+request.body.author)
    console.log("releaseDate:"+request.body.releaseDate)
    var book = new BookModel({
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate
    });
    console.log("body title:"+request.body.title);
    book.save( function( err ) {
        if( !err ) {
            console.log( 'created' );
            return response.send( book );
        } else {
            console.log( err );
            console.log(err.message)
            if(err.message.indexOf("duplicate")!=-1)
               return response.send('ERROR: 409, Book already exists');

               return response.send('ERROR');
        }
    });
});

router.get( '/books', function( request, response ) {
    return BookModel.find(function( err, books ) {
        if( !err ) {
            return response.send( books );
        } else {
            console.log( err );
            return response.send('ERROR: 420, No Book Found');
        }
    });
});


//Get a single book by id
router.get( '/books/:id', function( request, response ) {
    return BookModel.findById( request.params.id, function( err, book ) {
        if( !err ) {
            return response.send( book );
        } else {
            console.log( err );
            return response.send('ERROR: 404, Book Not Found');
        }
    });
});

//Delete a book
router.delete( '/books/:id', function( request, response ) {
    BookModel.findById( request.params.id, function( err, book ) {
        return book.remove( function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( 'Book removed' );
            } else {
                console.log( err );
                return response.send('ERROR: 404, Book Not Found');
            }
        });
    });
});


module.exports = router;
