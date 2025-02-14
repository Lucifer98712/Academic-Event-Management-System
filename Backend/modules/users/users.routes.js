const express=require("express");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const userDelete = require("./controllers/deleteUser");
const {auth, roleAuth} = require("../../middlewares/auth");

const userRouter= express.Router();
userRouter.post("/register",userRegister);
userRouter.post("/login",userLogin);
userRouter.delete("/delete",auth, roleAuth("admin"), userDelete);

module.exports=userRouter;