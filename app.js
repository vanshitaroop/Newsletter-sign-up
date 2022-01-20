const express = require("express");
const https = require("https");
const request = require("request");

const app = express();


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});
app.post("/", function(req, res) {
  const fName = req.body.Fname;
  const lName = req.body.Lname;
  const email = req.body.email;
  console.log(fName, lName, email);
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fName,
        LNAME: lName,
      }
    }]
  };
  const jsondata = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/20a70a4c65";

  const options = {
    method: "POST",
    auth: "vanshita1:e0b63c9be7b2223dfc3a43ecb9f605b3-us20"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode===200)
    {
      res.sendFile(__dirname + "/success.html")
    }
    else{
      res.sendFile(__dirname + "/failure.html")
    }

  response.on("data", function(data) {
    console.log(JSON.parse(data));
  })
})
  request.write(jsondata);
  request.end();

});
app.post("/failure" , function(req,res)
{
  res.redirect("/");
})

// API key
// e0b63c9be7b2223dfc3a43ecb9f605b3-us20

// list id
// 20a70a4c65.


// curl --request GET \
// --url 'https://<dc>.api.mailchimp.com/3.0/' \
// --user 'anystring:TOKEN

// --url 'https://<dc>.api.mailchimp.com/3.0/' \
// --header "Authorization: Bearer <TOKEN>"
