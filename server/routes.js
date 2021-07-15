const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const util = require('util');

//initializing routes
const apiRouter = express.Router();


//multer for file storage
const excalidrawImage = multer.diskStorage(
    {
        destination: `uploads`,
        filename: function (req, file, cb) {
            var filename = file.originalname.replace(/ /g, '');
            cb(null, filename);
        }
    }
);
const uploadImage = multer({storage : excalidrawImage})


//Api for automatic image upload
apiRouter.post('/uploadImage', uploadImage.single('file'), (req,res) => {
    res.json("file uploaded")
})


//Function for reading file names from uploads directory
const dirPath = path.join(__dirname, 'uploads');
const readdir = util.promisify(fs.readdir);

async function getFileNames() {
    let fileNames;
     try {
       fileNames = await readdir(dirPath);
     }catch (err) {
       console.log(err);
     }
     
     return fileNames;
   }


//Api for fetching list of Images
const filePath = path.join(__dirname);

apiRouter.get('/getImages', (req,res) => {
    let fileArray = getFileNames();
    fileArray.then(result => {
        console.log(result);
     fs.writeFile(
        `${filePath}/data.json`,
        JSON.stringify(result),
        function (err) {
            if (err) throw err;
            console.log("Object Saved!");
            
        }
    );
        res.json(result);
    })
    
})

module.exports = apiRouter;