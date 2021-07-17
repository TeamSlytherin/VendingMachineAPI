const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db')

const adminRoute = require('./routes/admin');


const app= express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Handling CORS error
app.use(cors({credentials: true,origin: true}));


//Routes 
app.use('/admin',adminRoute);



const POST = process.env.PORT || 4000;

const connectServer = async (PORT) => {
    await connectDB()

    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))
}

connectServer(PORT)




