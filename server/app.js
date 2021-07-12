const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const app = express()
const port = 4000

app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads')));

const dirPath = path.join(__dirname, 'uploads');


const readdir = util.promisify(fs.readdir);
//Function for reading file names from uploads directory
async function getFileNames() {
 let fileNames;
  try {
    fileNames = await readdir(dirPath);
  }catch (err) {
    console.log(err);
  }
  
  return fileNames;
}

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
app.post('/uploadImage', uploadImage.single('file'), (req,res) => {
    res.json("file uploaded")
})


//Api for fetching list of Images
app.get('/getImages', (req,res) => {
    let fileArray = getFileNames();
    fileArray.then(result => {
        res.json(result);
    })
    
})




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`)
})