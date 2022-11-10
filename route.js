const express= require('express');
const router = express.Router();
const {allPersonnels}=require('./controller');


router.post(('/', upload.single('file')),allPersonnels);

module.exports= router;