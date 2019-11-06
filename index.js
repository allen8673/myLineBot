// const linebot = require('linebot');
const express = require('express');
const bot = require('./mylinebot');
const dataprocess = require('./dataprocess')
// const db = require('./dbconnection');

// const clientList = ["U22e242eb07372036c7cdc031e521f840","U6281e4ee98d459a3cb1b6b42428c202f","U1439ebf6ff1dccefc54455187dee8db8","U8b35fceb0b30cb8ba109069528776d37"];
// const clientList = [];

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