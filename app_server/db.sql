# 功能一：用户登录
# 1.创建用户登录表
USE xz;
CREATE TABLE user_login(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(50),
    upwd VARCHAR(32)
);
# 2.添加两条测试数据(合法账户)
INSERT INTO user_login VALUES(null,'tom',md5('123456'));
INSERT INTO user_login VALUES(null,'jerry',md5('123456'));
INSERT INTO user_login VALUES(null,'Kevin',md5('123456'));