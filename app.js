var  a = require("express");
var  b = require("body-parser");
var  r = require("request");
const { request } = require("express");
const { json } = require("body-parser");

var  bro=a();
bro.use(b.urlencoded({extended: true} ) );
bro.use(a.static("public"));



bro.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html");

});

bro.post("/",function(req,res){
     var fn = req.body.n1;
     var ln = req.body.n2;
     var em = req.body.e;



     var data={
        members:[
            {
                email_address: em,
                status: "subscribed",
                merge_fields:
                    {FNAME: fn,
                     LNAME: ln,
                    }
            
            }


        ]



     };

     var jsonData = JSON.stringify(data);


     var option ={
        url:  "https:/mailchimp/List's Link",
     
        method:"POST",
        headers: {
            "Authorization": "key",
        },
     body: jsonData,
    
    };

    r(option,function(error,response,body){

        if(error)
        {   
        console.log(error);
        res.sendFile(__dirname+"/failure.html");
    }
        else
        {
        console.log(response.statusCode);
        res.sendFile(__dirname+"/success.html");
        }

    });



});




bro.post("/failure",function(req,res){
 res.redirect("/");


});

bro.listen(process.env.PORT || 3000,function(res,req){

console.log("Listening on port");
});
