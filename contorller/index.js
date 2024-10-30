const db = require("../database")

const GetUsername = async (req, res) => {
    let id = req.query.id
    try{
        const {rows}  =await db.query("SELECT * from person where id = $1", [id])
        res.status(200).json({
            rows
        })
        
    }catch(error){
        res.status(500).json({
            message: "Error while fetching data"
        })
    }
}

module.exports = GetUsername