const schedule = require("../schedule");
const config = require("../config");
const untils = require("../utils");
const superagent = require("../superagent");

/**
 * 扫码登录
 * @param qrcode
 * @param status
 */
async function onRoom(bot) {
   const all  = await bot.Room.findAll();
   console.log(all);
  //匹配规则可参考 schedule/index.js
  const time = "0 0 9 * * *";

  const time1 = "0 33 9 * * *";
  
  /*schedule.setSchedule(time, async () => {
  	console.log("定时开启");
    let today = await untils.formatDate(new Date()); //获取今天的日期
    let one = await superagent.getOne(); //获取每日一句
    const englishData = await superagent.getEnglishOne(); //英语一句话
    let english = `en：${englishData.en}\nzh：${englishData.zh}`;
    let poison = await superagent.getSoup(); //毒鸡汤
    const str = `${today}\n元气满满的一天开始啦,要加油噢^_^\n\n每日一句：\n${one}\n\n英语一句话：\n${english}\n\n毒鸡汤：\n${poison}`;
    const room = await bot.Room.find({ id:'24365976827@chatroom'});
    room.say(str);
   
  });

  schedule.setSchedule(time1, async () => {
    console.log("定时开启");
    let today = await untils.formatDate(new Date()); //获取今天的日期
    let one = await superagent.getOne(); //获取每日一句
    const englishData = await superagent.getEnglishOne(); //英语一句话
    let english = `en：${englishData.en}\nzh：${englishData.zh}`;
    let poison = await superagent.getSoup(); //毒鸡汤
    const str = `${today}\n元气满满的一天开始啦,要加油噢^_^\n\n每日一句：\n${one}\n\n英语一句话：\n${english}\n\n毒鸡汤：\n${poison}`;
    const room = await bot.Room.find({ id:'24275089022@chatroom'});
    room.say(str);
   
  });*/



}


module.exports = bot => {
    return async function onLogin() {
       /* await dailyRemind(bot);//日常提醒
        // await remindNoWrite(bot);//检查没有写的
        await collectContent(bot);//所有汇总*/
       /* const all  = await bot.Room.findAll();
        console.log(all);
        const id='25326544394@chatroom';
        const room = await bot.Room.find({ id:'25326544394@chatroom'});
        room.say("test");*/
        await onRoom(bot);
    }
}


