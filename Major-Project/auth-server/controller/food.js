const food = require("../model/food");

const createFood = async(req,res)=>{
    try{
        const {name,price,description,category,weight,foodImage} = req.body;
        const newFood = new Food({
            name,
            price,
            description,
            category,
            weight,
            foodImage,
        });
        const saveFood = newFood.save();
        res.status(200).json({
            message:"Food successfully added",
            success:false,
            data:{
                food:saveFood,
            },
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:"Internal server error",
            success:false,
        });
    }
};

const getAllFoods = async(req,res)=>{
    try{
       const foodItems=await Food.find()
        const saveFood = newFood.save();
        res.status(200).json({
            message:"Food successfully added",
            success:false,
            data:{
                food:foodItems,
            },
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:"Internal server error",
            success:false,
        });
    }
}

module.exports = { createFood,getAllFoods};