// 监听对话
const { Message } = require("wechaty")
const config = require('../config');
const cheerio = require('cheerio');
const {fetch} = require('../tool/fetch');
const replyMessage = require("../message/reply")
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const superagent = require("../superagent");
const { FileBox } = require("file-box");

const bot = require("../index.js");
//console.log(bot);

const { colorRGBtoHex, colorHex } = require("../utils");

const allKeywords = `回复序号或关键字获取对应服务
1.毒鸡汤
2.攻略
3.活动
4.段子
5.师兄
6.公众号
7.小程序
8.文案
0.菜单`
/*工具类：
转小写(例：转小写PEANUT)
转大写(例：转大写peanut)
转rgb(例：转rgb#cccccc)
转16进制(例：转16进制rgb(255,255,255))
更多功能菜单，欢迎私聊群主;*/
/*天气 城市名(例：天气 西安)`;*/

module.exports = bot => {
    return async function onMessage(msg) {
        //console.log(msg);

      /*  const webRoom = await bot.Room.find({
              topic: config.WEBROOM
            });
        await webRoom.say(allKeywords);*/

         //防止自己和自己对话
  if (msg.self()) return;
  const room = msg.room(); // 是否是群消息
  if (room) {
    //处理群消息
    await onWebRoomMessage(msg);
  } else {
    //处理用户消息  用户消息暂时只处理文本消息。后续考虑其他
    const isText = msg.type() === bot.Message.Type.Text;
    if (isText) {
      await onPeopleMessage(msg);
    }
  }

    }
}

// testRoomList = async (bot)=>{
//     const room = await bot.Room.find({ id: config.ROOM});
//     const all = await room.memberAll();
//     const singleUser = all.find((item)=>{
//         return item.id ==='wxid_x56dv06l9mq212';
//     })
//     room.say("nihaoya",singleUser)
// }

textJ = async (bot)=>{
    // const all  = await bot.Room.findAll();
    // let contact = await bot.Contact.find({ name: config.NICKNAME }) || await bot.Contact.find({ alias: config.NAME })
    // console.log("all====>",all,",length===>",all.length,",contact===>",contact)
    // await contact.say("你好呀") // 发送消息

}

var gy=[
  "https://www.sxbbt.net/detail.html?id=224&developid=1",
  "https://www.sxbbt.net/detail.html?id=216&developid=1",
  "https://www.sxbbt.net/detail.html?id=222&developid=1"
]

var hd=[
  "https://www.sxbbt.net/activity.html?id=15&developid=1",
  "https://www.sxbbt.net/activity.html?id=24&developid=1",
  "https://www.sxbbt.net/activity.html?id=25&developid=1"
]

/**
 * 处理用户消息
 */
async function onPeopleMessage(msg) {
  //获取发消息人
  const contact = msg.from();
  //对config配置文件中 ignore的用户消息不必处理
  //if (config.IGNORE.includes(contact.payload.name)) return;
  let content = msg.text().trim(); // 消息内容 使用trim()去除前后空格

  if (content === "菜单") {
    await delay(200);
    await msg.say(allKeywords);
  }else if (content === "毒鸡汤" || parseInt(content) === 1) {
      let poison = await superagent.getSoup();
      await delay(10);
      await msg.say(poison);
    } else if(content === "神回复" || parseInt(content) === 22){
      const { title, content } = await superagent.getGodReply();
      await delay(10);
      await msg.say(`标题：${title}~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~神回复：${content}`);
    }else if(content === "段子" || parseInt(content) ===4){
      const _dz = await superagent.getDz();
      await delay(10);
      await msg.say(_dz);
    }else if(content === "情话" || parseInt(content) === 44){
      const _qh = await superagent.getQh();
      await delay(10);
      await msg.say(_qh);
    }else if(content === "故事" || parseInt(content) === 55){
      const _gs = await superagent.getGs();
      await delay(10);
      await msg.say(_gs);
    }else if (content === "每日英语" || parseInt(content) === 66) {
      const { en, zh }= await superagent.getEnglishOne();
      await delay(10);
       await msg.say(`英文：${en}~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~中文：${zh}`);
    } else if(content === "每日一句" || parseInt(content) === 77){
      let one = await superagent.getOne();
      await delay(10);
      await msg.say(one);
    }else if(content === "攻略" || parseInt(content) === 2){
      var _num=Math.floor(Math.random()*2);
      var longUrl=gy[_num];
      await delay(200);
      const _url=await superagent.createShort(longUrl);
      console.log(_url);
      await msg.say(_url);  
    }else if(content === "活动" || parseInt(content) === 3){
      var _num=Math.floor(Math.random()*2);
      var longUrl=hd[_num];
      var _url=await superagent.createShort(longUrl);
      await msg.say(_url);
    }else if(content === "师兄" || parseInt(content) === 5){
      var longUrl='https://www.sxbbt.net/visit/itemlist.html';
      var _url=await superagent.createShort(longUrl);
      await msg.say(_url);
    }else if(content === "公众号" || parseInt(content) === 6){
      var longUrl='https://mp.weixin.qq.com/s/4eFQ9NziSlAVHvlM4gH1Bg'
      var _url=await superagent.createShort(longUrl);
      await msg.say(_url)
    }else if(content === "小程序" || parseInt(content) === 7){
      var longUrl='https://www.sxbbt.net/source/image/wx/hddsx.jpg'
      var _url=await superagent.createShort(longUrl);
      await msg.say(_url)
    }else if(content === "文案" || parseInt(content) ===8){
      const _dz = await superagent.getWenAn();
      await delay(10);
      await msg.say(_dz);
    }else if(content === "cp" || parseInt(content) ===9){
      var longUrl='https://www.sxbbt.net/visit/detail.html?id=4&developid=1';
      var _url=await superagent.createShort(longUrl);
      await msg.say(_url);
    }else {
      //await onUtilsMessage(msg);
    }
}
/**
 * 处理群消息
 */
async function onWebRoomMessage(msg) {
  const isText = msg.type();
  if (isText) {
    const content = msg.text().trim(); // 消息内容
    if (content === "菜单" || parseInt(content) === 0) {
    await delay(10);
    await msg.say(allKeywords);
    } else if (content === "毒鸡汤" || parseInt(content) === 1) {
      let poison = await superagent.getSoup();
      await delay(10);
      await msg.say(poison);
    } else if(content === "神回复" || parseInt(content) === 22){
      const { title, content } = await superagent.getGodReply();
      await delay(10);
      await msg.say(`标题：${title}~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~神回复：${content}`);
    }else if(content === "段子" || parseInt(content) ===4){
      const _dz = await superagent.getDz();
      await delay(10);
      await msg.say(_dz);
    }else if(content === "情话" || parseInt(content) === 44){
      const _qh = await superagent.getQh();
      await delay(10);
      await msg.say(_qh);
    }else if(content === "故事" || parseInt(content) === 55){
      const _gs = await superagent.getGs();
      await delay(10);
      await msg.say(_gs);
    }else if (content === "每日英语" || parseInt(content) === 66) {
      const { en, zh }= await superagent.getEnglishOne();
      await delay(10);
       await msg.say(`英文：${en}~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~中文：${zh}`);
    } else if(content === "每日一句" || parseInt(content) === 77){
      let one = await superagent.getOne();
      await delay(10);
      await msg.say(one);
    }else if(content === "攻略" || parseInt(content) === 2){
      var _num=Math.floor(Math.random()*2);
      var longUrl=gy[_num];
      await delay(200);
      const _url=await superagent.createShort(longUrl);
      console.log(_url);
      await msg.say(_url);  
    }else if(content === "活动" || parseInt(content) === 3){
      var _num=Math.floor(Math.random()*2);
      var longUrl=hd[_num];
      var _url=await superagent.createShort(longUrl);
      await msg.say(_url);
    }else if(content === "师兄" || parseInt(content) === 5){
      var longUrl='https://www.sxbbt.net/visit/itemlist.html';
      var _url=await superagent.createShort(longUrl);
      await msg.say(_url);
    }else if(content === "公众号" || parseInt(content) === 6){
      var longUrl='https://mp.weixin.qq.com/s/4eFQ9NziSlAVHvlM4gH1Bg'
      var _url=await superagent.createShort(longUrl);
      await msg.say(_url)
    }else if(content === "小程序" || parseInt(content) === 7){
      var longUrl='https://www.sxbbt.net/source/image/wx/hddsx.jpg'
      var _url=await superagent.createShort(longUrl);
      await msg.say(_url)
    }else if(content === "文案" || parseInt(content) ===8){
      const _dz = await superagent.getWenAn();
      await delay(10);
      await msg.say(_dz);
    }else if(content === "cp" || parseInt(content) ===9){
      var longUrl='https://www.sxbbt.net/visit/detail.html?id=4&developid=1';
      var _url=await superagent.createShort(longUrl);
      await msg.say(_url);
    }
    else {
      //await onUtilsMessage(msg);
    }
  }
}

/**
 * utils消息处理
 */
async function onUtilsMessage(msg) {
  const contact = msg.from(); // 发消息人
  const isText = msg.type();
  if (isText) {
    let content = msg.text().trim(); // 消息内容
    if (content.indexOf("转大写") === 0) {
      try {
        const str = content.replace("转大写", "").trim().toUpperCase();
        await msg.say(str);
      } catch (error) {
        await msg.say("转换失败，请检查");
      }
    } else if (content.indexOf("转小写") === 0) {
      try {
        const str = content.replace("转小写", "").trim().toLowerCase();
        await msg.say(str);
      } catch (error) {
        await msg.say("转换失败，请检查");
      }
    } else if (content.indexOf("转16进制") === 0) {
      try {
        const color = colorRGBtoHex(content.replace("转16进制", "").trim());
        await msg.say(color);
      } catch (error) {
        console.error(error);
        await msg.say("转换失败，请检查");
      }
    } else if (content.indexOf("转rgb") === 0) {
      try {
        const color = colorHex(content.replace("转rgb", "").trim());
        await msg.say(color);
      } catch (error) {
        console.error(error);
        await msg.say("转换失败，请检查");
      }
    }else {
      return true;
    }
  } else {
    return true;
  }
}

