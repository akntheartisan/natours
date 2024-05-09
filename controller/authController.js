const userModel = require('../Models/userSchema');

exports.signup = async (req,res,next)=>{

    try {

        const newUser = await userModel.create(req.body);
        res.status(200).json({
            status:'success',
            data:{user:newUser}
        });
        
    } catch (error) {

        res.status(400).json({
            status:'fail',
            message:error
          });
        
    }

}