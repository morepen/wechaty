const {Wechaty} = require('wechaty')
const {PuppetPadplus} = require("wechaty-puppet-padplus");
const config = require('./config')
const onScan = require('./bot/onScan')
const onLogin = require('./bot/onLogin')
const onMessage = require('./bot/onMessage')
const onLogout = require('./bot/onLogout')
const onRoomJoin = require("./bot/onRoomJoin") // 加入房间监听回调
const api = require('./api/index');


const bot = new Wechaty({
    puppet: new PuppetPadplus({
        token: config.TOKEN
    }),
    name: "小艾"
});


bot
    .on('scan', onScan)
    .on('login', onLogin(bot))
    .on("room-join", onRoomJoin)
    .on('logout', onLogout)
    .on('message', onMessage(bot))
    .on("friendship", "./bot/on-friendship")
    //.on("room-join", "./bot/on-room-join")
    //.on("room-leave", "./bot/on-room-leave")

    .start()
    .then(() => console.log('开始登陆微信'))
    .catch(e => console.error(e))
    /*console.log(bot.Room.find({
      topic: config.WEBROOM
    }));*/
    module.exports = bot;



