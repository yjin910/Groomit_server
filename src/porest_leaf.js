'use strict';

var express = require('express');
var router = express.Router();
var fs = require("fs");
var LOG_PATH = 'cap_data'

router.post('/', (req, res) => {
    try{
        var cam_no = req.body.c;
        var time = req.body.t;
        var info = req.body.i;
        var file_name = req.body.fn;
        var filepath = LOG_PATH + '/' + cam_no + '/' + cam_no;

        var req_json_obj = {
            'date' : time,
            'info': info,
            'fileName' : file_name
        }
        if (!fs.existsSync(LOG_PATH)){
            fs.mkdirSync(LOG_PATH);
        }
        
        if (!fs.existsSync(LOG_PATH + '/' + cam_no)){
            fs.mkdirSync(LOG_PATH + '/' + cam_no);
        }
            

        //TODO: should check if undefined exist 
        fs.readFile(filepath , 'utf8', function(err, data){
            // if file does not exists
            if (err) {
                var init_json = {};
                init_json['num'] = '1';
                init_json['data'] = [req_json_obj];

                fs.writeFile(filepath, JSON.stringify(init_json), function(err) {
                    if(err) throw err;
                    console.log("Created a new file");
                });
            } else {
                var file_json = JSON.parse(data);
                
                var data_count = Object.keys(file_json.data).length;
                file_json['num'] = data_count + 1;
                file_json['data'].push(req_json_obj);

                fs.writeFile(filepath, JSON.stringify(file_json), function(err) {
                    if(err) throw err;
                    console.log("Updated a file");
                });
            }

            res.send("success");
        });
    } catch (e){
        console.error('catch error: ', e.stack);
        res.status(404);
    }

});

module.exports = router;
