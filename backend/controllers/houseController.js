const House = require('../models/HouseModel')


const houseController={
    getHouse: async (req, res) => {
        try{
            const data = await House.find()
            res.json({
                success: true,
                response:data})
        }catch{
            res.json({
                success: false,
                response:"Error loading Houses"})
        }
    },
        
    uploadHouse: async (req, res) => {

        var {address, neighborhood, squareMeters, bedrooms, bathrooms, price, garden, userId, photo, photo2, views} = req.body//destructuring
        /* var userId = req.body.user */
        const newHouse = new House({
            address, 
            neighborhood, 
            userId, 
            squareMeters, 
            bedrooms, 
            bathrooms, 
            price, 
            garden,
            photo,
            photo2,
            views
        })
        try{
            await newHouse.save()
            res.json({
                success: true,
                response:"House uploaded"})
        }catch(error){
            res.json({
                success: false,
                response:error})
        }
        
    },

    deleteHouse: async (req, res) =>{
        var id = req.params.id
        try{
            await House.findOneAndDelete({_id: id})
            res.json({
                success: true,
                response: "House Deleted"})
        }catch{
            res.json({
                success: false,
                response:"Error deleting House"})
        }
    },

    modifyHouse: async (req, res) => {
        var id= req.params.id
        var {address, neighborhood, userId, squareMeters, bedrooms, bathrooms, price, garden, date} = req.body
        
        try{
            await House.findOneAndUpdate(
                {_id:id},
                {address, neighborhood, userId, squareMeters, bedrooms, bathrooms, price, garden, date}
            )
            res.json({
                success: true,
                response: "House modified"
            })
        }catch{
            res.json({
                success: false,
                response:"Error modifying House"})
        }
    },
    getHouseById: async (req, res) =>{
        var id = req.params.id
        try{
            const data = await House.find({_id: id})
            res.json({
                success: true,
                response: data
            })
        }catch{
            res.json({
                success: false,
                response: "Error geting house"
            })
        }
    }

}



module.exports = houseController