// app.js 服务器端
// 1.下载第三方模块
//      express express-session mysql cors
// 2.引入第三方模块
const express = require('express');
const session = require('express-session');
// const FileStore = require('session-file-store');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// 3.创建服务器
var server = express();

// axios.defaults.baseURL = "https://api.apiopen.top";
// Vue.prototype.axios = axios;

server.use(bodyParser.urlencoded({
    extended: false
}));

// 4.公开静态资源目录
server.use(express.static('public'));

// 5.创建数据库连接池
var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3306',
    database: 'xz',
    connectionLimit: 15
});

// 6.配置跨域cors
server.use(cors({
    origin: ['http://127.0.0.1:8080','http://localhost:8080'],
    // 每次发送请求都要验证
    credentials: true
}));

var identityKey = 'kevinc';

// 7.配置session
server.use(session({
    name: identityKey,
    // 加密条件
    secret: "kevinc", // 用来对session id相关的cookie进行签名
    // store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    // 请求更新数据
    resave: false,  // 是否每次都重新保存会话，建议false
    // 保存初始数据
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    cookie: { maxAge: 10 * 1000 }  // 有效期，单位是毫秒
}));

// 8.监听端口
server.listen(4000);

// 功能一：用户登录验证
server.post('/login', (req, res) => {
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    console.log(uname,upwd);
    var data = {};
    

    var sql = "SELECT id FROM user_login WHERE uname=? AND upwd=md5(?)";

    pool.query(sql,[uname,upwd],(err,result) => {
        // console.log(result);
        if(err) throw err;
        if(result.length == 0) {
            res.send({code:-1, msg:"用户名或密码错误"});
        }else {
            // 将当前登录的用户id保存到session对象中作为登录凭证
            // 获取当前用的的id
            // console.log(1);
            var uid = result[0].id;
            // console.log(uid);
            req.session.regenerate( err => {
                if(err) {
                    return res.json({code: -1, msg: "登录失败"});
                }else {
                    req.session.loginUser = uid;
                    console.log(req.session.loginUser)
                    res.send({code: 1, msg: "登陆成功"});
                }
            });
            // req.session.cookie.uid = uid;
            // // console.log(req.session);
            // res.send({code:1, msg:"登陆成功"});
        }
    });
});


// 功能二：显示商品的分页列表
server.get('/product',(req, res) => {
    var pno = req.query.pno;
    var ps = req.query.pageSize;
    // console.log(req.session);


    // 1.为参数设置默认值
    if(!pno) pno = 1;
    if(!ps) ps = 12;  

    // 2.sql
    var sql = "SELECT lid,lname,price,img_url FROM products_list LIMIT ?,?";

    // 每页显示的数据量
    ps = parseInt(ps);
    pno = parseInt(pno);
    // 起始的记录数
    var offset = (pno - 1) * ps;
    

    // 3.返回数据
    pool.query(sql,[offset,ps],(err, result) => {
        if(err) throw err;
        if(!result.length) {
            res.send({code:-1, msg:"没有数据了"});
        }else {
            res.send({code:1, msg:"查询成功", data:result});
        }
    });

});

// 功能三：将商品添加至购物车
server.get('/addcart',(req, res) => {
    // res.send({code:5, msg:"测试"});

    // 1.获取当前登录用户的凭证
    // var uid = req.session.uid;
    var uid = req.session.loginUser;
    console.log(uid)
    // console.log(req.session.cookie);

    // 2.如果当前用户没有登录 - 提示请登录
    if(!uid) {
        res.send({code:-2, msg:"请登录"});
        return;
    }
    // 3.如果已登录，获取脚手架传递的参数lid、lname、price
    var lid = req.query.lid;
    var lname = req.query.lname;
    var price = req.query.price;
    // 4.创建查询SQL语句
    var sql = "SELECT id FROM cart WHERE uid=? AND lid=?";
    // 5.执行查询SQL
    pool.query(sql,[uid,lid],(err,result) => {
        if(err) throw err;
        // 判断当前用户是否购买过此商品
        if(result.length == 0) {
            // 6.如果没买过此商品 - 添加
            var sql = `INSERT INTO cart VALUE(null,${lid},${price},1,'${lname}',${uid})`;
        }else {
            // 7.如果已购买过 - 增加数量
            var sql = `UPDATE cart SET count=count+1 WHERE uid=${uid} AND lid=${lid}`;
        }
        
        // 8.执行操作SQL
        pool.query(sql, (err, result) => {
            if(err) throw err;
            res.send({code:1, msg:"添加成功"});
        });
    });
});

// 检查用户名是否存在
server.get('/checkuname', (req, res) => {
    const uname = req.query.uname;

    const sql = `SELECT uname FROM user_login WHERE uname=?`;
    pool.query(sql,[uname],(err, result) => {
        // console.log(result.length)
        if(err) throw err;
        if(result.length > 0) {
            // console.log(-1);
            res.send({code: -1, msg:'用户名已存在'});
        }else {
            res.send({code: 1, msg:'用户名可用'});
        }
    })
});

// 注册
server.get('/register', (req, res) => {
    const uname = req.query.uname;
    const upwd = req.query.upwd;

    const sql = `INSERT INTO user_login VALUE(null,?,md5(?))`;
    
    pool.query(sql,[uname,upwd], (err, result) => {
        if(err) throw err;
        if(result.affectedRows == 1) {
            res.send({code: 1, msg: "注册成功"});
        }else {
            res.send({code: -1, msg: "注册失败"});
        }
    })
});

// 获取数据
