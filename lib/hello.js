var moment = require('moment');

module.exports = {
  sayHello: sayHello,
  sayGoodbye: sayGoodbye
}

function sayHello(){
  return "Hello today is " + getDay();
}

function sayGoodbye(){
  return "Goodbye today is " + getDay();
}

function getDay(){
  return moment().format('dddd');
}
