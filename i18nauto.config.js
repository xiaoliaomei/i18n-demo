const { resolve } = require('path');

const rootPath = process.cwd();

module.exports = {
  // 中文词条的配置文件
  entry: {
    filename: 'zh.json', // 文件名（不含目录路径）
    path: resolve(rootPath, './lang/languages'), // 文件所在绝对目录（不含文件名）
  },
  // 翻译配置
  translate: {
    on: true, // 是否开启翻译
    lang: ['en'], // 要翻译成哪些语言
    path: resolve(rootPath, './lang/languages'), // 生成的翻译文件所在目录
    secretId: 'AKIDRkrpY3KMAk6F9pJYYKrAaliRwCD4h5MP', // 必填。翻译api所需的你用户信息secretId 
    secretKey: 'tZ1GJ9l8JH7mIdpqeFdmgNr8C3hBUcXF', // 必填。翻译api所需的你用户信息secretKey
  },
  keyRule(value, config) {
    return value;
  },
};
