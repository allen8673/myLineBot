const linebot = require('linebot');
const dataprocess = require('./dataprocess')

const bot = linebot({
    channelId: '1653340482',
    channelSecret: 'af4d905b8cada074224be42c516f8d59',
    channelAccessToken: 'xqf0V6QiAPkFTrgQVaCcvp6Ougp5Gy8idn5v2znRvPaLrOVEjovUdqkcQRpd8kAnxpNGxm4283g+AhjfA9gt2FEkTPSDGRS+MPR6MAQ/xG92P47PK87KYsdwFuVlpc9kzC/N4EJ8dW5tfhTNjzU91AdB04t89/1O/w1cDnyilFU='
});

const authValue = 'abcd1234';

//取得使用者回覆的訊息
bot.on('message', async (event) => {
    if (event.message.type === 'text') {
        var msg = event.message.text;
        const user = await dataprocess.getUser(event.source.userId); 

        if (!user) {
            return;
        }

        if (msg === authValue && user.auth !== authValue) {
            await dataprocess.updateAuth(user.id, msg)
            event.reply(`已經將您(${user.id})的廣播權限開通，您可以透過‘開啟廣播’和‘關閉廣播’開關廣播功能`).then(function (data) {
                console.log(event);
            }).catch(function (error) {
                console.log('error:' + error);
            });
            return;
        }

        if (user.auth !== authValue) {
            event.reply("您並沒有廣播權限，請輸入代碼以開啟權限").then(function (data) {
                console.log(event);
            }).catch(function (error) {
                console.log('error:' + error);
            });
            return;
        }

        switch (msg) {
            case '開啟廣播':
                if (!user.broadcast) {
                    await dataprocess.updateBroadcast(user.id, true);
                    event.reply("已經開啟您的廣播功能了，您現在可以接受和推播訊息").then(function (data) {
                        console.log(event);
                    }).catch(function (error) {
                        console.log('error:' + error);
                    });
                }
                break;
            case '關閉廣播':
                if (user.broadcast) {
                    await dataprocess.updateBroadcast(user.id, false);
                    event.reply("已經關閉您的廣播功能了，您現在無法接受和推播訊息").then(function (data) {
                        console.log(event);
                    }).catch(function (error) {
                        console.log('error:' + error);
                    });
                }
                break;
            default:
                const clientList = await dataprocess.getAllUsers();
                if (user.broadcast) {
                    event.reply("我已經跟大家說:" + msg).then(function (data) {
                        console.log(event);
                    }).catch(function (error) {
                        console.log('error:' + error);
                    });
                    clientList.forEach(c => {
                        if (c.id != event.source.userId && c.auth && c.broadcast) {
                            bot.push(c.id, ['有人說:' + msg]);
                        }
                    })
                }
                break;
        }
    }
});

bot.on('follow', async (event) => {
    await dataprocess.addUser(event.source.userId);
});

bot.on('unfollow', async (event) => {
    await dataprocess.deleteUser(event.source.userId);
});

module.exports = bot;