const express = require('express');
const bot = require('./mylinebot');
const dataprocess = require('./dataprocess')

const app = express();
const linebotParser = bot.parser();
app.get("/", (req, res)=> { 
    res.send("Hello LineBot");
});
app.post('/', linebotParser);
app.get('/getlist', async (req, res)=>{
    const data = await dataprocess.getAllUsers()
    res.send(data);
});

app.get('/getuser', async (req, res)=>{
    const data = await dataprocess.getUser(req.query.id)
    res.send(data);
});

app.get('/pushmsg', async (req, res)=> { 
    const clientList = dataprocess.getAllUsers()
    if(req.query.msg){
        clientList.forEach(user=>
        {
            bot.push(user.id, [req.query.msg]);
        });
    }
});

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});