const linebot = require('linebot');
const dataprocess = require('./dataprocess')

const bot = linebot({
    channelId: '1653340482',
    channelSecret:'af4d905b8cada074224be42c516f8d59',
    channelAccessToken: 'xqf0V6QiAPkFTrgQVaCcvp6Ougp5Gy8idn5v2znRvPaLrOVEjovUdqkcQRpd8kAnxpNGxm4283g+AhjfA9gt2FEkTPSDGRS+MPR6MAQ/xG92P47PK87KYsdwFuVlpc9kzC/N4EJ8dW5tfhTNjzU91AdB04t89/1O/w1cDnyilFU='
});

const clientList = [];

//取得使用者回覆的訊息
bot.on('message', (event) => {
    if (event.message.type === 'text') {
        const clientList = dataprocess.getAllUsers();
        var msg = event.message.text;
        var user = clientList.find(i=>i.id===event.source.userId);

        if(!user){
            return;
        }

        // if( msg === 'abcd1234' && !user.auth){
        //     user.auth = true;
        //     user.broadcast = true;
        //     event.reply("已經將您的廣播權限開通，您可以透過‘開啟廣播’和‘關閉廣播’開關廣播功能").then(function (data) {
        //         console.log(event);
        //     }).catch(function (error) {
        //         console.log('error:'+error);
        //     });
        //     return;
        // }

        // if(!user.auth){
        //     event.reply("您並沒有廣播權限，請輸入代碼以開啟權限").then(function (data) {
        //         console.log(event);
        //     }).catch(function (error) {
        //         console.log('error:'+error);
        //     });
        //     return;
        // }

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
    }
});

bot.on('follow', async (event) => {
    const clientList = await dataprocess.getAllUsers();
    if(!clientList.some(i=> i.id === event.source.userId)){
       await  dataprocess.addUser(event.source.userId);
        // clientList.push({
        //     id: event.source.userId,
        //     broadcast: false,
        //     auth:false
        // })
    }
});

bot.on('unfollow', async (event) => {
    const clientList = await dataprocess.getAllUsers();
    if(clientList.some(i=> i.id === event.source.userId)){
        await dataprocess.deleteUser(event.source.userId);
        // clientList.splice(clientList.findIndex(i=>i.id === event.source.userId), 1)
    }
});

module.exports = bot;