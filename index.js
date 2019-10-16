
const Koa = require('koa');
const Router = require('koa-router');
var bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = Router();

const linebot = require('linebot');
const bot = linebot({
    channelId: '1653340482',
    channelSecret:'af4d905b8cada074224be42c516f8d59',
    channelAccessToken: 'Jh4piRE0jQx8ZaJIO+YdNxQIpi62WprUkM097Jj+AjgLwB48QSPyoHIL62B09vf+xpNGxm4283g+AhjfA9gt2FEkTPSDGRS+MPR6MAQ/xG8xbblG6pfs1i9zf0kofqnFUzIMgnrUlxnOlPDVeHaMmwdB04t89/1O/w1cDnyilFU='
})

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
})

app.use(bodyParser());

router.get('/api/sayHello', async function(ctx) {

    if(ctx.query.msg){
        var userId = 'U6281e4ee98d459a3cb1b6b42428c202f';
        var sendMsg = ctx.query.msg;
        bot.push(userId, [sendMsg]);
        // ctx.body ="Hello" + ctx.query.msg;
    }

    ctx.body = 'Hello World';


});

app.use(router.routes());

app.get("/", function (req, res) { 
    res.send("Hello LineBot");
});

app.listen(3001);

