// 配置文件
module.exports = {
  // 基础定时发送功能配置项（必填项）
  ALL_USER_LIST: [
    { id: 27169291, name: '小人头', },
  ],
  WITHDRAWA_DATE: '00 50 17 * * *', //下班提醒写日报
  // REMIND_DATE: '00 50 17 * * *', //提醒发日报
  COLLOECT_DATE:'10 30 09 * * *', //晨会
  WIKI_URL: 'http://wiki.xxxxx.com/pages/viewpage.action?pageId=', //wiki内容地址
  NAME: '小人头', //备注
  NICKNAME: '萝卜特', //微信网名
  TOKEN: '**',
  WEBROOM: '**',
  shortKey: '**', //生成短链接KEY
  KEYWORDs:['本组','全部'],
   room: {
    // 管理群组列表
    roomList: {
      // 群名(用于展示，最好是群名，可随意) : 群id(这个可不能随意)
      测试: "**"
    },
    // 加入房间回复
    roomJoinReply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`
  },
};