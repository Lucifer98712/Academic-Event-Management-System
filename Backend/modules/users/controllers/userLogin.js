const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userLogin=async(req,res)=>{
    const Users=mongoose.model("users");
    const Events = mongoose.model("events");
    const {email,password} = req.body;

     try{
       if(!email) throw "Email must be provided.";
       if(!password) throw "Password must be provided.";
       const getUser= await Users.findOne({
        email:email
       });
       if(!getUser) throw "This email doesn't exist."
       const matched= await bcrypt.compare(password,getUser.password);
       if(!matched) throw "Email and password doesn't match."

       const tokenPayload = {
        id: getUser._id,
        role: getUser.role,
      };

       let tokenOptions={expiresIn: '90 days'} ; // Default expiration time for user and admin
       if (getUser.role === 'organizer') {
        const event = await Events.findOne({ organizer: getUser._id }).sort({ eventDate: -1 }); // Get the latest event
        if (!event) throw "No event found for this organizer.";
  
        const eventEndDate = new Date(event.eventDate);
        const expirationDate = new Date(eventEndDate);
        expirationDate.setDate(expirationDate.getDate() + 5); // Add 5 days to event end date
  
        const expiresIn = Math.floor((expirationDate.getTime() - Date.now()) / 1000); // Convert to seconds
        tokenOptions = { expiresIn: expiresIn };
      }

      const accessToken = jwt.sign(tokenPayload, process.env.jwt_salt, tokenOptions);
      res.status(200).json({
        status: "success",
        message: "User logged in successfully.",
        accessToken: accessToken,
        user: {
          id: getUser._id,
          name: getUser.name,
          email: getUser.email,
          role: getUser.role
      }
      });
       
       // Setting isLoggedIn to true
        getUser.isLoggedIn = true;
        await getUser.save();

     }catch(e){
        res.status(400).json({
            status:"failed",
            error:e
        });
     }
     
 }
 module.exports=userLogin;