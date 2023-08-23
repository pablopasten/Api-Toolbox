const express= require("express");
const router= express.Router();
const apicontroller= require("../../controllers/v1/apicontroller")

router
    .get("/", apicontroller.getAllFiles)



module.exports=router;    
