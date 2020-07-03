const express = require('express');
const router = express.Router();
const multer = require("multer");
var fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var camNum = req.body.camNum;
    var basePath = 'src/public/cap_data/'
    var camPath = `${basePath}${camNum}`;
    var path = `${camPath}/jpeg/`  //'../public/cap_data/' + camNum + '/jpeg/';

    if (!fs.existsSync(basePath)){
        fs.mkdirSync(basePath);
    }
    if (!fs.existsSync(camPath)) {
        fs.mkdirSync(camPath);
    }
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
    cb(null, path)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

// 1. multer 미들웨어 등록
let upload = multer({
    storage: storage
})

// 2. 파일 업로드 처리
router.post('/create', upload.single("imgFile"), function(req, res, next) {
    // 3. 파일 객체
    let file = req.file;

    // 4. 파일 정보
    let result = {
        originalName : file.originalname,
        size : file.size,
    }

    res.json(result);
});

module.exports = router;
