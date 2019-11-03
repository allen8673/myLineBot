var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1653340482',
    channelSecret:'af4d905b8cada074224be42c516f8d59',
    channelAccessToken: 'xqf0V6QiAPkFTrgQVaCcvp6Ougp5Gy8idn5v2znRvPaLrOVEjovUdqkcQRpd8kAnxpNGxm4283g+AhjfA9gt2FEkTPSDGRS+MPR6MAQ/xG92P47PK87KYsdwFuVlpc9kzC/N4EJ8dW5tfhTNjzU91AdB04t89/1O/w1cDnyilFU='
});

// const clientList = ["U22e242eb07372036c7cdc031e521f840","U6281e4ee98d459a3cb1b6b42428c202f","U1439ebf6ff1dccefc54455187dee8db8","U8b35fceb0b30cb8ba109069528776d37"];
const clientList = [];

//取得使用者回覆的訊息
bot.on('message', (event) => {
    if (event.message.type === 'text') {
        var msg = event.message.text;
        var user = clientList.find(i=>i.id===event.source.userId);

        if(!user){
            return;
        }

        if( msg === 'acbd1234' && !user.auth){
            user.auth = true;
            user.broadcast = true;
            event.reply("已經將您的廣播權限開通，您可以透過‘開啟廣播’和‘關閉廣播’開關廣播功能").then(function (data) {
                console.log(event);
            }).catch(function (error) {
                console.log('error:'+error);
            });
            return;
        }

        if(!user.auth){
            event.reply("您並沒有廣播權限，請輸入代碼以開啟權限").then(function (data) {
                console.log(event);
            }).catch(function (error) {
                console.log('error:'+error);
            });
            return;
        }

        switch (msg) {
            case '開啟廣播':
                if(!user.broadcast){
                    user.broadcast = true;
                    event.reply("已經開啟您的廣播功能了，您現在可以接受和推播訊息").then(function (data) {
                        console.log(event);
                    }).catch(function (error) {
                        console.log('error:'+error);
                    });
                }
                break;
            case '關閉廣播':
                    if(user.broadcast){
                        user.broadcast = false;
                        event.reply("已經關閉您的廣播功能了，您現在無法接受和推播訊息").then(function (data) {
                            console.log(event);
                        }).catch(function (error) {
                            console.log('error:'+error);
                        });
                    }
                break;
            default:
                if(user.broadcast){
                    event.reply("我已經跟大家說:" + msg).then(function (data) { 
                        console.log(event);
                    }).catch(function (error) {
                        console.log('error:'+error);
                    });
                    clientList.forEach(c=>{
                         if(c.id != event.source.userId && c.auth && c.broadcast){
                            bot.push(c.id, ['有人說:'+msg]);
                        }
                    })
                }
                break;
            }

        

        // event.reply("我已經跟大家說:"+msg).then(function (data) {
        //     // success
        //     console.log(event);
        // }).catch(function (error) {
        //     // error
        //     console.log('error:'+error);
        // });

        // clientList.forEach(c=>{
        //     if(c!=event.source.userId){
        //         bot.push(c, ['有人說:'+msg]);
        //     }
        // })

        // var msg = event.message.text;
        // //重覆使用者說的訊息
        // event.reply("您說："+msg).then(function (data) {
        //     // success
        //     console.log(event);
        // }).catch(function (error) {
        //     // error
        //     console.log('error:'+error);
        // });
    }
});

bot.on('follow', (event) => {
    // if(!clientList.includes(event.source.userId))
    // {
    //     clientList.push(event.source.userId);
    // }

    if(!clientList.some(i=> i.id === event.source.userId)){
        clientList.push({
            id: event.source.userId,
            broadcast: false,
            auth:false
        })
    }
});

bot.on('unfollow', (event) => {
    // if(clientList.includes(event.source.userId))
    // {
    //     clientList.splice(clientList.indexOf(event.source.userId),1)
    // }

    if(clientList.some(i=> i.id === event.source.userId)){
        clientList.splice(clientList.findIndex(i=>i.id === event.source.userId), 1)
    }
});

// // 主動發送訊息
// setTimeout(function () {
//     var userId = '1653340482';
//     var sendMsg = '安安';
//     bot.push(userId, [sendMsg]);
//     console.log('userId: ' + userId);
//     console.log('send: ' + sendMsg);
// }, 3000);


const app = express();
const linebotParser = bot.parser();
app.get("/", (req, res)=> { 
    res.send("Hello LineBot");
});
app.post('/', linebotParser);
app.get('/getlist', (req, res)=>{
    res.send(clientList);
});

app.get('/pushmsg', (req, res)=> { 
    if(req.query.msg){
        clientList.forEach(userid=>
        {
            bot.push(userid, [req.query.msg]);
        });
    }
});

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});