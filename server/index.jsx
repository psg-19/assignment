const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./connection.jsx');
// const dbConnect = require('./routes/auth.jsx');

dotenv.config();
(async()=>{
  await dbConnect();
  const app = express();
  // app.use(cors());
   app.use(cors({
      origin: "https://assignment-rho-lake.vercel.app/",
    //   origin: FRONTEND_URL,
   
      optionsSuccessStatus: 200,
      credentials: true 
    }));
  app.use(express.json());

  app.use('/api/auth', require('./routes/auth.jsx'));
  app.use('/api/forms', require('./routes/forms.jsx'));
  app.use('/api/forms', require('./routes/response.jsx'));

  app.get('/', (req,res)=>res.send('API running'));
  const PORT = process.env.PORT||5000;
  app.listen(PORT,()=>console.log(`Server on ${PORT}`));
})();