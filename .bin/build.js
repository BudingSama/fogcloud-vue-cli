#! /usr/bin/env node
const program = require('commander');// 解析用户输入的命令
const download = require('download-git-repo');// 拉取仓库文件
const chalk = require('chalk');//改变输出字体颜色
const ora = require('ora');//图标资源
const fs = require('fs');
//init
program
  .version('1.0.0')
  .option('-i, init [name]', 'init fogcloud product')
  .parse(process.argv);

  if (program.init) {
    console.log('run init fogcloud')
    const spinner = ora('downloading fogcloud-vue template...');
    spinner.start();
    download('BudingSama/fogcloud-vue', program.init, function (err) {
      if(!err){
        // 输出项目成功的信息
        spinner.stop();
        const success = ora(chalk.blueBright('download completed.')).succeed();
        //fix product name
        fs.readFile(`${process.cwd()}/${program.init}/package.json`, (err, data) => {
          if (err) throw err;
          let _data = JSON.parse(data.toString())
          _data.name = program.init
          _data.version = '0.0.1'
          let str = JSON.stringify(_data, null, 4);
          fs.writeFile(`${process.cwd()}/${program.init}/package.json`, str, function (err) {
            if (err) throw err;
          })
        });
      }else{
        // 输出项目失败的信息
        const fail = ora(chalk.redBright('download failed.')).fail();
      }
    })
  }
