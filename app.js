const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const jwt =  require('jsonwebtoken');
const app= express();

const productRouter = require('./routes/products')

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Handling CORS error
app.use(cors({credentials: true,origin: true}));


//Routes 
app.use('/admin',adminRoute);
app.use('/user',userRoute);
app.use('/products',productRouter)

app.post('/api/post', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
          res.json({
            message: 'Post request...',
            authData
          });
        }
      });
})

app.post('/api/login', (req, res) => {
// Mock user or admin
const user = {
    id:'admin',
    username: 'admin',
    email:'admin@gmail.com'
}

   jwt.sign({user}, 'secretkey' , { expiresIn: '30s' }, (err,token) => {
       res.json({
          token
       });
   });
});


// FORMAT OF TOKEN
// Authorization: First <access_token>

// VerifyToken middleware function
function verifyToken(req, res, next) {
    // Get auth header value
    const firstHeader = req.headers['Bearer'];
    // Check if bearer is undefined
    if(typeof firstHeader !== 'undefined') {
     // Split at the space
     const first = firstHeader.split(' ');
     // Get token from array
     const firstToken = first[1];
     // Set the token
     req.token = firstToken;
     // Next middleware
     next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

const PORT = process.env.PORT || 4000;

const connectServer = async (PORT) => {
    await connectDB()

    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))
}

connectServer(PORT)




