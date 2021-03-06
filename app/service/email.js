'use strict';

const Service = require('egg').Service;

const Imap = require('imap');
const MailParser = require('mailparser').MailParser;
const nodemailer = require('nodemailer');

class EmailService extends Service {

  async getEmail() {
    const p = new Promise(function(resolve, reject) {
      const imap = new Imap({
        user: 'kwei1@visteon.com', // 你的邮箱账号
        password: 'Temp2019', // 你的邮箱密码
        host: 'outlook.office365.com', // 邮箱服务器的主机地址
        port: 993, // 邮箱服务器的端口地址
        tls: true, // 使用安全传输协议
        tlsOptions: {
          rejectUnauthorized: false,
        }, // 禁用对证书有效性的检查
      });

      function openInbox(cb) {
        imap.openBox('INBOX', false, cb);
      }

      imap.once('ready', function() {

        openInbox(function(err, box) {

          console.log('打开邮箱');

          if (err) throw err;

          imap.search([ 'UNSEEN', [ 'SINCE', 'Mar 21, 2019' ]], function(err, results) { // 搜寻2017-05-20以后未读的邮件

            if (results.length === 0) {
              resolve('没有邮件了...');
              imap.end();
              return;
            }

            if (err) throw err;

            const f = imap.fetch(results, {
              bodies: '',
              markSeen: true,
            }); // 抓取邮件（默认情况下邮件服务器的邮件是未读状态）

            f.on('message', function(msg, seqno) {

              const mailparser = new MailParser();

              msg.on('body', function(stream, info) {

                stream.pipe(mailparser); // 将为解析的数据流pipe到mailparser

                // 邮件头内容
                mailparser.on('headers', function(headers) {
                  console.log('邮件头信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                  console.log('邮件主题: ' + headers.get('subject'));
                  console.log('发件人: ' + headers.get('from').text);
                  console.log('收件人: ' + headers.get('to').text);
                });

                // 邮件内容

                mailparser.on('data', function(data) {
                  if (data.type === 'text') { // 邮件正文
                    console.log('邮件内容信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                    console.log('邮件内容: ' + data.html);
                  }
                  if (data.type === 'attachment') { // 附件
                    console.log('邮件附件信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                    console.log('附件名称:' + data.filename); // 打印附件的名称
                    // data.content.pipe(fs.createWriteStream(data.filename)); //保存附件到当前目录下
                    data.release();
                  }
                });

              });
              msg.once('end', function() {
                console.log(seqno + '完成');
              });
            });
            f.once('error', function(err) {
              console.log('抓取出现错误: ' + err);
            });
            f.once('end', function() {
              resolve('所有邮件抓取完成!');
              console.log('所有邮件抓取完成!');
              imap.end();
            });
          });
        });
      });

      imap.once('error', function(err) {
        console.log(err);
      });

      imap.once('end', function() {
        console.log('关闭邮箱');
      });

      imap.connect();
    });
    return p;
  }

  async postEmail(emailData, mailOptions) {
    return new Promise(function(resolve, reject) {

      const transporter = nodemailer.createTransport(emailData);

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        }
        resolve(info.messageId);
      });

    });
  }

  async findEmail(where) {
    const result = await this.ctx.model.Email.findOne(where);
    return result;
  }

  async findList(where = {}, pageSize, currentPage) {
    const result = {
      total: await this.ctx.model.Email.find(where).count(),
      list: await this.ctx.model.Email.find(where).skip((currentPage - 1) * pageSize).limit(pageSize),
      currentPage,
    };
    return result;
  }

  async addEmail(eMailInfo) {
    const Info = new this.ctx.model.Email(eMailInfo);
    return new Promise((resolve, reject) => {
      try {
        this.ctx.model.Email.create(Info, err => {
          if (err) {
            resolve({
              code: 1,
              message: '邮箱名称不能重复',
            });
          }
          resolve({
            code: 0,
            message: '添加成功',
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async updateEmail() {
    const result = await this.ctx.model.email.updateOne({
      _id: '5c00f0ce862e9227acb56d22',
    }, {
      password: 'cccccccccc',
    });
    return result;
  }

  async updateEmailTime(key, value) {
    const result = await this.ctx.model.email.updateOne(key, value);
    return result;
  }

  async deleteEmail() {
    const result = await this.ctx.model.email.deleteOne({
      _id: '5c00f0ce862e9227acb56d22',
    });
    return result;
  }

}

module.exports = EmailService;
