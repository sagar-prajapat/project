const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name : "djnnzitul" , 
    api_key: "956344188782992" , 
    api_secret:"K36w4JwGUPUW8LVs3cTa2NeR9Yk"
});

const imageUploadController = async (req,res) =>{
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path)
        res.json({
            url:result.secure_url,
            public_id : result.public_id,
        });
    } catch (error) {
        console.log(error)
    }
};


module.exports = {imageUploadController}