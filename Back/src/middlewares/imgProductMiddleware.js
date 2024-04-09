const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, path.resolve(__dirname, '../../public/images/productos'))
    },
    filename: (req, file, cb)=> {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        console.log(fileName)
        cb(null,fileName)
    }
})
const upload = multer({storage})

module.exports = upload