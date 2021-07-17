const mongoose = require('mongoose')

const connectDB = async () => {
     
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL, {
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