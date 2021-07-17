const mongoose = require('mongoose')

const connectDB = async () => {
     
    const url = process.env.MONGO_UR || "< add atlas mongo url >"
    
    try{
        const conn = await mongoose.connect(url, {
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true
        })

        console.log(`Database connected : ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error: ${err.message}`)
        process.exit(1)
    }
}


module.exports = connectDB