const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async(req,res) =>{
    try{
        const {fullname,email,phoneNumber,password,role} = req.body
      
        if (!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        };

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });
        
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
     }catch(error){
        console.log(error);
     }
}

exports.login = async(req,res) =>{
    try{
        const{email,password,role} = req.body;

        if (!email || !password || !role){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        };
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
       const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

exports.logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}