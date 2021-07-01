const express = require("express");
const fetch = require("node-fetch")
require("dotenv").config()
const PORT = process.env.PORT || 8000;
const axios = require("axios");
const bodyParser = require('body-parser');
const app = express();

const cors = require('cors');



app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.send("hey i am home page");
})

app.post("/api/code", (req, res) => {
 
    let code = req.body.Gcode;
    console.log(code);

    let accesstoken="";
    const requestOptions = {
        method: 'POST',
        headers: {'Accept': 'application/json',
                    },
    };

  const git_api_access_token =`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`

    axios.post(git_api_access_token,"",requestOptions)
    .then((res) => {
        console.log("RESPONSE ==== : ", res.data.access_token);
        accesstoken = res.data.access_token
         
          app.post("/api/accesstoken",function(requ,resp){
            const result = {"atoken":accesstoken}
            resp.send(JSON.stringify(result)) ;
          })
      })
      .catch((err) => {
        console.log("ERROR: ====", err);
      })
  
  
})


 

app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});