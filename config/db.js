const mongoose = require('mongoose')

const connectDB = async () => {
     
    const url = process.env.MONGO_UR || "mongodb+srv://dbUser:cumberbitch17@cluster0.cjzy9.mongodb.net/test"
    
    try{
        const conn = await mongoose.connect(url, {
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`Database connected : ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error: ${err.message}`)
        process.exit(1)
    }
}


module.exports = connectDB