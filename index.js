var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1653340482',
    channelSecret:'af4d905b8cada074224be42c516f8d59',
    channelAccessToken: 'xqf0V6QiAPkFTrgQVaCcvp6Ougp5Gy8idn5v2znRvPaLrOVEjovUdqkcQRpd8kAnxpNGxm4283g+AhjfA9gt2FEkTPSDGRS+MPR6MAQ/xG92P47PK87KYsdwFuVlpc9kzC/N4EJ8dW5tfhTNjzU91AdB04t89/1O/w1cDnyilFU='
});

//取得使用者回覆的訊息
bot.on('message', function (event) {
    if (event.message.type = 'text') {
        var msg = event.message.text;
        //重覆使用者說的訊息
        event.reply("您說："+msg).then(function (data) {
            // success
            console.log(event);
        }).catch(function (error) {
            // error
            console.log('error:'+error);
        });
    }
});

// 主動發送訊息
setTimeout(function () {
    var userId = 'Your User ID';
    var sendMsg = "push hands up ";
    bot.push(userId, [sendMsg]);
    console.log('userId: ' + userId);
    console.log('send: ' + sendMsg);
}, 3000);


const app = express();
const linebotParser = bot.parser();
app.get("/", function (req, res) { 
    res.send("Hello LineBot");
});
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});