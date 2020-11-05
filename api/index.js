/*const superagent = require("./config/superagent");
console.log(superagent);*/
/*const cheerio = require("cheerio");
const request = require("request");
const ONE = "http://wufazhuce.com/"; // ONE的web版网站
const POISON = "https://8zt.cc/"; //毒鸡汤网站
const TXHOST = "https://api.tianapi.com/txapi/"; // 天行host 官网：tianapi.com
const APIKEY = ""; // 天行key，请先去网站注册填写key  注册免费  注册后申请下面的接口即可。



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

 let soup = await api.getSoup();

 console.log(soup);*/
const superagent = require('superagent');
const cheerio = require("cheerio");
var method='get';
var url='https://8zt.cc/';
 

async function getSoup() {
    try{

      superagent('GET',url)//这里的URL也可以是绝对路径
        .end(function(req,res){
            //do something
            //console.log(res);
            let $ = cheerio.load(res.text);
            const content = $("#sentence").text();
            console.log(content);
            return content;
            
        })


    }catch(err){
      console.error("err");
      return err;
    }
}

module.exports = {
  getSoup
  /*getChinaFeiyan,
  getProvinceFeiyan,
  getGodReply,
  getEnglishOne*/
};