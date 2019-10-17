var linebot = require('linebot');
var bot = linebot({
    channelId: '1653340482',
    channelSecret:'af4d905b8cada074224be42c516f8d59',
    channelAccessToken: 'xqf0V6QiAPkFTrgQVaCcvp6Ougp5Gy8idn5v2znRvPaLrOVEjovUdqkcQRpd8kAnxpNGxm4283g+AhjfA9gt2FEkTPSDGRS+MPR6MAQ/xG92P47PK87KYsdwFuVlpc9kzC/N4EJ8dW5tfhTNjzU91AdB04t89/1O/w1cDnyilFU='
});
// bot.on('message', function (event) {
//     if (event.message.type = 'text') 
//     {
//         var msg = event.message.text;
//         //重覆使用者說的訊息
//         event.reply("您說："+msg).then(function (data) {
//             // success
//             log = event;
//             console.log(event);
//         }).catch(function (error) {
//             // error
//             log = 'error:'+error
//             console.log('error:'+error);
//         });
//     }
// });

const Koa = require('koa');
const Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = Router();
app.use(bodyParser());
const linebotParser = bot.parser();
router.get('/', async function(ctx) {

    if(ctx.query.msg){
        var userId = 'U6281e4ee98d459a3cb1b6b42428c202f';
        var sendMsg = ctx.query.msg;
        bot.push(userId, [sendMsg]);
        ctx.body ="OK" + ctx.query.msg;
    }else{
        ctx.body = 'Hello World';
    }
});
router.get('/open', async function(ctx) {

    bot.on('message', function (event) {
        if (event.message.type = 'text') 
        {
            var msg = event.message.text;
            //重覆使用者說的訊息
            event.reply("您說："+msg).then(function (data) {
                // success
                log = event;
                console.log(event);
            }).catch(function (error) {
                // error
                log = 'error:'+error
                console.log('error:'+error);
            });
        }
    });
    ctx.body = 'open';

});
router.post('/',async function(ctx) {
    ctx.body = 'Hello World';
})
router.get('/log', async function(ctx) {
    linebotParser;
    ctx.body = log;
});

app.use(router.routes());
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

