#创建购物车表
USE xz;
CREATE TABLE 'buy_cart'(
    id      INT PRIMARY KEY AUTO_INCREAMENT,
    lid     INT,
    #高精度的浮点数类型
    price   DECIMAL(10,2),
    count   INT,
    lname   VARCHAR(255),
    uid     INT
);