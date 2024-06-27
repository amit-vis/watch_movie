module.exports.home = (req, res)=>{
    return res.status(200).json({
        message: "our project is running successfully!!",
        success: true
    })
}