const express = require('express');
const index = express();
const excelToJson= require('convert-excel-to-json');
const multer =require('multer');
const fs = require('fs-extra');

//middleware
index.use(express.json());

var upload = multer({dest: "uploads/" });

index.post('/nss/', upload.single('file'), (req,res)=>
{
 try { 
       if (req.file?.filename ==null || req.file?.filename == 'undefined') 
       { 
           res.status(400).json("No File!!!");
       } else {
       var filePath = "uploads/" + req.file.filename;

    const excelData = excelToJson({
       sourceFile: filePath,
       header: {
           rows: 1,
       },
       columnToKey: {
           "*": "{{columnHeader}}"
       },
    });

    fs.remove(filePath);

    res.status(200).json(excelData);
 }
} catch(error) {
   res.status(500);
}
});

const port = process.env.PORT || 6000;

index.listen(port, ()=>{
    console.log("Waguannnn");
})
