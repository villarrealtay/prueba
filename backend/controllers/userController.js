const User = require('../models/userModel')
const Joi = require('@hapi/joi')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController={
    getUser: async (req, res) => {
        try{
            const data = await User.find()
            res.json({
                success: true,
                response:data})
        }catch{
            res.json({
                success: false,
                response:"Error loading users"})
        }
    },
        
    getUserById: async (req, res) => {
        var id = req.user._id
        try{
            const data = await User.findOne({_id: id})
            res.json({
                success: true,
                response:data})
        }catch{
            res.json({
                success: false,
                response:"Error loading users"})
        }
    },
    uploadUser: async (req, res) => {
        console.log("HOLA")
        let {user, photo, password,name, surname,mail,country,role} = req.body//destructuring
        let error = false
        const passwordHashed = bcryptjs.hashSync(password, 10)
        
        const newUser = new User({
            user: user.trim(),
            photo: photo.trim(),
            password: passwordHashed,
            name: name.trim().charAt(0).toUpperCase() + name.slice(1),
            surname: surname.trim().charAt(0).toUpperCase() + surname.slice(1),
            mail: mail.trim(),
            country: country.trim().charAt(0).toUpperCase() + country.slice(1),
            role
        })
        try{
            
            const res = await newUser.save()
            console.log(res)
        }catch (err){
            error = err
        }finally{
            if(error){
                res.json({
                    success: false,
                    response: error
                })
            }else{
                jwt.sign({...newUser}, process.env.SECRETORKEY, {}, (error, token)=>{
                    if(error){
                        res.json({success:false, response: "Something went wrong"})
                    }else{
                        res.json({success: true, response:{
                            token,
                            name: newUser.name,
                            photo: newUser.photo,
                            role: userExist.rol
                            }
                        })
                    }
                })
            }
        }
        
    },
    validateUser: (req, res, next) =>{
        const schema = Joi.object({
            user: Joi.string().min(2).max(40).trim().required(),
            photo: Joi.string().required().trim().required(),
            password: Joi.string().required().pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,60}/, "password").trim(),
            passwordValidation: Joi.ref('password'),
            name: Joi.string().min(2).max(40).trim().required(),
            surname: Joi.string().min(2).max(40).trim().required(),
            mail: Joi.string().email().required().trim(),
            country: Joi.string().min(2).max(40).trim().required(),
            role:Joi.string().min(2).max(40).trim().required()
        })
        const validation = schema.validate(req.body)
        if (validation.error !== undefined){
            res.json({
                success: false,
                error:"Some fields are invalid, please fix them.",
                message:validation.error
            })
        }else{
            next()
        }
        
    },

    deleteUser: async (req, res) =>{
        var id = req.params.id
        try{
            await User.findOneAndDelete({_id: id})
            res.json({
                success: true,
                response: "User Deleted"})
        }catch{
            res.json({
                success: false,
                response:"Error deleting user"})
        }
    },

    modifyUser: async (req, res) => {
        var id= req.params.id
        var {name, photo, password, passwordValidation, user, surname, role, email, country} = req.body
        
        try{
            await User.findOneAndUpdate(
                {_id:id},
                {name, photo, password, passwordValidation, user, surname, role, email, country}
            )
            res.json({
                success: true,
                response: "User modified"
            })
        }catch{
            res.json({
                success: false,
                response:"Error modifying user"})
        }
    },

    logUser: async (req, res) => {
        var {user, password } = req.body
        
        const userExist = await User.findOne({user})
        if (!userExist){
            res.json({success: false, response: "The username or password are incorrect"})
        }else{
            const passwordMatches = bcryptjs.compareSync(password, userExist.password)
            if (!passwordMatches){
                res.json({success: false, response: "The username or password are incorrect"})
            }else{
                jwt.sign({...userExist}, process.env.SECRETORKEY, {}, (error, token)=>{
                    if(error){
                        res.json({success:false, response: "Something went wrong"})
                    }else{
                        res.json({success: true, response:{
                            token,
                            name: userExist.name,
                            photo: userExist.photo,
                            role: userExist.role
                            }
                        })
                    }
                })
                
            } 
        }
    },
    validateToken: (req,res) =>{
        const name = req.user.name
        const photo = req.user.photo
        const role = req.user.role
        res.json({
            success: true, 
            response: {name, photo, role}
        })
    }, 
    getUsersExist: async (req,res) =>{
        
        const user = req.body.user
        const userExist = await User.findOne({user})
        if (userExist){
            res.json({
                success:true
            })
        }else{
            res.json({
                success:false
            })
        }
    }

}



module.exports = userController