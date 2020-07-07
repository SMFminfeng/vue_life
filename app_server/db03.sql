# 功能二：商品列表
USE xz;
# 1.添加一列
ALTER TABLE products_list ADD img_url VARCHAR(255);
# 2.更新数据
UPDATE products_list SET img_url='01.jpg' WHERE mod(lid,2)=1;
UPDATE products_list SET img_url='02.jpg' WHERE mode(lid,2)=0;