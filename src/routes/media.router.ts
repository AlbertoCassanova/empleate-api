import express from 'express';
import path from 'path';

const route = express.Router();

route.get('/:path/:image',(req, res) => {
    const __dirname = path.resolve(path.dirname(''));
    const filePath = (path.join(__dirname, "media/" + req.params.path + "/" + req.params.image));
    console.log(req.params);
    res.sendFile(filePath)
})

export default route;