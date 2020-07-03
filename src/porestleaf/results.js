'use strict';
var express = require('express');
var router = express.Router();
var dbcon = require('../dbConnection');
var fs = require('fs');
var path = require('path');

router.get('/', (req, res) => {
    var cap_path = '../public/cap_data'
    //console.log(__dirname, '../cap_path'));

    fs.readdir(path.join(__dirname, cap_path), (err, files) => {
        if(err){
            console.log(err);
            res.send(err);

            return;
        }else{
            res.render('results.pug', {topics: files});
        }
    });
});

router.get('/:id', (req, res) => {
    var cap_path = '../public/cap_data'
    var id = req.params.id;
    
    fs.readdir(path.join(__dirname, cap_path), (err, files) => {
        if(err){
            console.log(err);
            res.send(err);

            return;
        }

        fs.readdir(path.join(__dirname, cap_path, id), (err, newFiles) => {
            if(err){
                console.log(err);
                res.send(err);

                return;
            }else{
                res.render('results.pug', {topics: newFiles, prev: "", path: id});
            }
        });
    });
});

router.get('/:id/:id2', (req, res) => {
    var id = req.params.id;
    var id2 = req.params.id2;

    var cap_path = '../public/cap_data/' + id;

    fs.readdir(path.join(__dirname, cap_path), (err, files) => {
        if(err){
            console.log(err);
            res.send(err);

            return;
        }

        var stats = fs.statSync(path.join(__dirname, cap_path, id2));

        if(stats.isDirectory()){
            fs.readdir(path.join(__dirname, cap_path, id2), (err, newFiles) => {
                if(err){
                    console.log(err);
                    res.send(err);

                    return;
                }else{
                    res.render('results.pug', {topics: newFiles, prev: "", path: id + "/" + id2});
                }
            });
        }else{
            fs.readFile(path.join(__dirname, cap_path, id2), (err, data) => {
                if(err){
                    console.log(err);
                    res.send(err);

                    return;
                }
                res.render('results.pug', {topics: files, titles: id, description: data, prev: id , path: id});
            });
        }
    });
});

router.get('/:id/:id2/:cap', (req, res) => {
    var id = req.params.id;
    var id2 = req.params.id2;
    var cap = req.params.cap;

    var cap_path = '../public/cap_data/' + id + '/' + id2;

    fs.readdir(path.join(__dirname, cap_path), (err, files) => {
        if(err){
            console.log(err);
            res.send(err);

            return;
        }
        fs.readFile(path.join(__dirname, cap_path, cap), (err, data) => {
                if(err){
                    console.log(err);
                    res.send(err);

                    return;
                }

                var image_path = '/' + cap_path + '/' + cap;
                res.render('results.pug', {topics: files, titles: id, image: image_path, prev: id, path: id + "/" + id2});
        });
    });
});


module.exports = router;
