<?php
//响应头
header("content-type:text/html;charset=utf-8");
//获取前端请求的参数
$id=$_GET['id'];
//连接数据库
$link=mysqli_connect("localhost",'root','','bbb');
//设置编码
mysqli_set_charset($link,"utf8");
//SQL语句，查询数据表中符合的数据
$sql="select * from goods where goods_id=$id";
//执行SQL，返回结果集
$result=mysqli_query($link,$sql);
//获取结果集中的第一条数据
$row=mysqli_fetch_assoc($result);
//把当前数组转为字符串，并通过Ajax的成功回调函数，响应给浏览器（返回给前端）
echo json_encode($row);
//关闭连接
mysqli_close($link);
?>
