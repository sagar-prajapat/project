const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const otpGenerator=require('otp-generator')
const nodemailer=require('nodemailer')
const registerController = async (req, res) => {
};

const authController = async(req, res) => {
    try{
        const user = await User.findOne({_id: req.body.userId });
        if(!user){
            return res.status(200).send({
                message: "User not found",
                success: false,
            });
        }else{
            console.log(user);
            return res.status(200).send({
                message: "Register successfully",
                data: {
                    user,
                },
                success: true,
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message:`Auth error`,
        });
    }
};
    
const loginController = async(req, res) => {
    try{
        console.log(req.body);
        const user=await User.findOne({ email:req.body.email }).select(
            "+password"
        );
        if(!user){
            return res.status(200).send({
                message: "User not found",
                success: false,
            });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        const signuser = await User.findOne({ email: req.body.email});
        if(!isMatch){
            return res.status(200).send({
                success: false,
                message : `Invalid password and email`,
            }); 
        }

        const token = jwt.sign({id: signuser._id},process.env.JWT_SECRET,{
            expiresIn: "1d",
        });
        return res.status(201).send({
            message: "Login successfully",
            data: {
                user: signuser,
                token,
            },
            success: true,
        });


    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message:`Auth error`,
        });
    }

}

const verifyOtpController = async(req,res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user.otp === req.body.combineOtp){
            user.isVerified = true;
            await user.save();
            res.status(200).send({
                success: true,
                message: 'failed to verified',
            });
        }
        else{
            res.status(200).send({
                success: false,
                message: 'otp not verified',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'failed to verified',
        });
    }
}

module.exports = { registerController, authController, loginController,verifyOtpController };




//   try {
//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser) {
//         return res.status (200).send({
//             message: "User already exist",
//             success: false,
//         });
//         }
//         const password = req.body.password;
//         const salt = await bcrypt.genSalt (10);
//         const hashPassword = await bcrypt.hash (password, salt);
//         req.body.password = hashPassword;

           
//             const otp = otpGenerator.generate(6, {
//                 digits: true,
//                 upperCase: false,
//                 specialChars: false,
//                 upperCaseAlphabets: false,
//                 lowerCaseAlphabets : false,
//             });

//             req.body.passwordConfrim = confrimPassword;
//             if (req.body.password === req.body.passwordConfrim) {
//                 const newUser = new User({
//                     name: req.body.name,
//                     email: req.body.email,
//                     profileImage: req.body.profileImage,
//                     password: req.body.nacord,
//                     passwordConfrim : req.body.passwordConfrim,
//                     otp: otp,
//                 });

//                 await newUser.save();
//                 const token = jwt.sign({id: newUser._id},process.eve.JWT_SECRET, {
//                     expiresIn: "Id",
//                 });

//                 const transporter = nodemailer.createTransport({
//                     service: "Gmail",
//                     auth: {
//                         user: "sagarprajapat8696@gmail.com",
//                         pass: "futltmwccwybgand"
//                     }
                
//             }) ;

//             const mailOptions = {
//                 from: "Auth client webdev warriors",
//                 to: req.body.email,
//                 subject: "Otp for email verification",
//                 text: `Your verify otp is ${otp}`,
//             };

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.log(error);
//                     return res.status(500).send("Error sending email..");
//                 }
//                 res.send({
//                     message: "Otp sent to email",
//                 });

//              });

//              return res.status(201).send({
//                 message: "Register sucessfully",
//                 data: {
//                     user: newUser,
//                     token,
//                 },
//                 success: true,
//              });
//             }else {
//                 return res.status(201).send({
//                     message: "Password not match",
//                     success: false,
//                 });
//             }
//         } catch (error) {
//         console.log(error);
//         return res.status (500).send({
//             success: false,   
//             message: "Auth error",
//           });
//         }
//     };

//     module.exports = {registerController };