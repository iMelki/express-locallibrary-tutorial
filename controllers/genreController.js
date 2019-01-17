var Genre = require('../models/genre');
var async = require('async');
var mongoose = require('mongoose');
var Book = require('../models/book');

// Display list of all Genre.
exports.genre_list = function(req, res, next) {
    Genre.find()
        .sort([['name', 'ascending']])
        .exec(function(err, genreList){
            if(err) return next(err);
            res.render('genre_list', {title: 'Genre List', genre_list: genreList});
        });
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
    //var id = mongoose.Types.ObjectId(req.params.id);
    var id = req.params.id;
    async.parallel({
        genre: function(callback) {
            Genre.find({'genre': id })
              .exec(callback);
        },

        genre_books: function(callback) {
          Book.find({'genre': id })
          .exec(callback);
        },
    }, function(err, result){
        if (err) return next(err);
        if(!result.genre){
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books } );
    });
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST.
exports.genre_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};