const superagent = require("../config/superagent");
const cheerio = require("cheerio");
const request = require("request");
const ONE = "http://wufazhuce.com/"; // ONE的web版网站
const POISON = "https://8zt.cc/"; //毒鸡汤网站
const TXHOST = "https://api.tianapi.com/txapi/"; // 天行host 官网：tianapi.com
const APIKEY = "96fdfe88bad7a8b666e3927cc93e6d16"; // 天行key，请先去网站注册填写key  注册免费  注册后申请下面的接口即可。
const config = require('../config');




//返回智能聊天
async function SmartChat(content) {
    try{

      var url = "http://api.qingyunke.com/api.php?key=free&appid=0&msg="+encodeURI(content);
      let res = await superagent.req(url, "GET");
      //console.log(res.text);
      var _body=JSON.parse(res.text);
      if(_body){
        return _body.content;
      }else{
        return false;
      }
      

    }catch(e){
       return false;
    }
    

}
//生成短链接
async function createShort(longurl) {


    try{
      var shortKey = config.shortKey;
      var url = "http://suo.im/api.htm?format=json&key=" + shortKey + "&url=" + longurl;
      let res = await superagent.req(url, "GET");
      var url_short = '';
      if (res.body.err == '') {
            url_short = res.body.url;
            //console.log(url_short);
            return url_short;
        } else {
            return longurl;
        }
      return JSON.stringify(res.body)

    }catch(e){
       console.log(e);
    }
    return false;






    console.log("进入接口-createShort-longurl", longurl);
    var shortKey = config.shortKey;
    var url = "http://suo.im/api.htm?format=json&key=" + shortKey + "&url=" + longurl;
    console.log("createShort-url:", url);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function (err, reponse, body) {
        console.log('createShort-body:', body);
        console.log('createShort-err:', err);
        var url_short = '';
        if (body.err == '') {
            url_short = body.url;
            console.log(url_short);
            return url_short;
        } else {
            return longurl;
        }
    });
}







/**
 * 获取每日一句
 */
async function getOne() {
  try {
    let res = await superagent.req(ONE, "GET");
    let $ = cheerio.load(res.text);
    let todayOneList = $("#carousel-one .carousel-inner .item");
    let todayOne = $(todayOneList[0])
      .find(".fp-one-cita")
      .text()
      .replace(/(^\s*)|(\s*$)/g, "");
    return todayOne;
  } catch (err) {
    console.log("错误", err);
    return err;
  }
}

/**
 * 获取每日毒鸡汤
 */
async function getSoup() {
  try {
    let res = await superagent.req(POISON, "GET");
    let $ = cheerio.load(res.text);
    const content = $("#sentence").text();
    return content;
  } catch (err) {
    console.error("err");
    return err;
  }
}

/**
 * 获取全国肺炎数据
 */
function getChinaFeiyan() {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `https://c.m.163.com/ug/api/wuhan/app/data/list-total?t=${new Date().getTime()}`
      },
      function (err, response) {
        if (err) {
          reject(err);
        }
        const res = JSON.parse(response.body);
        resolve(res);
      }
    );
  });
}
/**
 * 获取省份肺炎数据
 */
async function getProvinceFeiyan(name) {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `https://gwpre.sina.cn/interface/fymap2020_data.json?t=${new Date().getTime()}`
      },
      function (err, response) {
        if (err) {
          reject(err);
        }
        try {
          const res = JSON.parse(response.body);
          res.data.list.forEach(item => {
            if (name === item.name) {
              resolve(item);
              return;
            }
          });
        } catch (error) {
          reject(err);
        }
      }
    );
  });
}
/**
 * 获取神回复
 */
async function getGodReply() {
  const url = TXHOST + "godreply/index";
  try {
    let res = await superagent.req(url, "GET", {
      key: APIKEY
    });
    let content = JSON.parse(res.text);
    if (content.code === 200) {
      return content.newslist[0];
    } else {
      console.log("获取接口失败", content.msg);
    }
  } catch (err) {
    console.log("获取接口失败", err);
  }
}

/**
 * 获取文案
 */
async function getWenAn() {
  const url = TXHOST + "pyqwenan/index";
  try {
    let res = await superagent.req(url, "GET", {
      key: APIKEY
    });
    let content = JSON.parse(res.text);
    if (content.code === 200) {
      return content.newslist[0].content;
    } else {
      console.log("获取接口失败", content.msg);
    }
  } catch (err) {
    console.log("获取接口失败", err);
  }
}

/**
 * 获取段子
 */
async function getDz() {
  const url = TXHOST + "mnpara/index";
  try {
    let res = await superagent.req(url, "GET", {
      key: APIKEY
    });
    let content = JSON.parse(res.text);
    if (content.code === 200) {
      return content.newslist[0].content;
    } else {
      console.log("获取接口失败", content.msg);
    }
  } catch (err) {
    console.log("获取接口失败", err);
  }
}
/**
 * 获取故事
 */
async function getGs() {
  const url = TXHOST + "story/index";
  try {
    let res = await superagent.req(url, "GET", {
      key: APIKEY
    });
    let content = JSON.parse(res.text);
    if (content.code === 200) {
      return content.newslist[0].content;
    } else {
      console.log("获取接口失败", content.msg);
    }
  } catch (err) {
    console.log("获取接口失败", err);
  }
}
/**
 * 获取情话
 */
async function getQh() {
  const url = TXHOST + "saylove/index";
  try {
    let res = await superagent.req(url, "GET", {
      key: APIKEY
    });
    let content = JSON.parse(res.text);
    if (content.code === 200) {
      return content.newslist[0].content;
    } else {
      console.log("获取接口失败", content.msg);
    }
  } catch (err) {
    console.log("获取接口失败", err);
  }
}
/**
 * 每日英语一句话
 */
async function getEnglishOne() {
  const url = TXHOST + "ensentence/index";
  try {
    let res = await superagent.req(url, "GET", {
      key: APIKEY
    });
    let content = JSON.parse(res.text);
    if (content.code === 200) {
      return content.newslist[0]; //en英文  zh中文
    } else {
      console.log("获取接口失败", content.msg);
    }
  } catch (err) {
    console.log("获取接口失败", err);
  }
}

async function getWeather() { //获取墨迹天气
  let MOJI_HOST='https://tianqi.moji.com/weather/china/';
  let CITY='wuhan';
  let LOCATION='pudong-new-district';
  let url ='https://tianqi.moji.com/weather/china/hubei/hongshan-district';
  let res = await superagent.req(url,'GET')
  let $ = cheerio.load(res.text)
  let weatherTips = $('.wea_tips em').text()
  const today = $('.forecast .days').first().find('li');
  let todayInfo = {
    Day:$(today[0]).text().replace(/(^\s*)|(\s*$)/g, ""),
    WeatherText:$(today[1]).text().replace(/(^\s*)|(\s*$)/g, ""),
    Temp:$(today[2]).text().replace(/(^\s*)|(\s*$)/g, ""),
    Wind:$(today[3]).find('em').text().replace(/(^\s*)|(\s*$)/g, ""),
    WindLevel:$(today[3]).find('b').text().replace(/(^\s*)|(\s*$)/g, ""),
    PollutionLevel:$(today[4]).find('strong').text().replace(/(^\s*)|(\s*$)/g, "")
  }
  let obj = {
  weatherTips:weatherTips,
  todayWeather:todayInfo.Day + ':' + todayInfo.WeatherText + '<br>' + '温度:' + todayInfo.Temp +  '<br>'
    + todayInfo.Wind + todayInfo.WindLevel + '<br>' + '空气:' + todayInfo.PollutionLevel + '<br>'
  }
  return  obj
}

module.exports = {
  getOne,
  getSoup,
  getDz,
  getQh,
  getGs,
  getChinaFeiyan,
  getProvinceFeiyan,
  getGodReply,
  getEnglishOne,
  createShort,
  getWenAn,
  getWeather,
  SmartChat
};
