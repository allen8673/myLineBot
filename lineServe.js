const linebot = require('linebot');

const bot = linebot({
    channelId: '1653340482',
    channelSecret:'af4d905b8cada074224be42c516f8d59',
    // channelAccessToken: 'Channel access token'
})



// 主動發送訊息
// setTimeout(function () {
//     var userId = 'U6281e4ee98d459a3cb1b6b42428c202f';
//     var sendMsg = "安安你好";
//     bot.push(userId, [sendMsg]);
//     // console.log('userId: ' + userId);
//     // console.log('send: ' + sendMsg);
// }, 60000);