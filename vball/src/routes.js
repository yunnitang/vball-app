import express from 'express';
import multer from 'multer';
import Game from './Game.js';

var router = express.Router();
var storage = multer.diskStorage({
  destination: "data",
  filename: function (req, file, cb) {
    req.newFileName = global.data.generate_unique_game_id();
    cb(null, req.newFileName + ".dvw")
  }
});
var upload = multer({storage: storage});

// default route
router.get('/',function(req,res,next){
    res.sendFile(__dirname + '/../client/build/index.html');
});

router.get('/api/game/:gameid',function(req,res){
    res.json(global.data.games[req.params.gameid]);
});

router.get('/api/games',function(req,res){
    res.json(Object.keys(global.data.games));
});

router.post('/upload', upload.single('dvwFile'), function(req,res,next){
    // Error Checking
    if (!req.file) {
        const error = new Error('No file found');
        error.httpStatusCode = 400;
        return next(error);
    }

    // redirect
    res.redirect("/");

    // Parse newly uploaded file and add to games array
    global.data.addGame(req.newFileName);
});

export default router;