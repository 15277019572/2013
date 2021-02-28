<?php
//设置响应头
header("content-type:text/html;charset=utf-8");
//连接数据库
$link=mysqli_connect("localhost",'root','','bbb');
//设置编码
mysqli_set_charset($link,"utf8");
//获取传入的参数
$u1=$_GET['username'];
$p1=$_GET['password'];
//编写sql语句
$sql = "select * from fff where name='$u1'";
//执行sql
$result = mysqli_query($link, $sql);
//判断结果集中是否有数据
if (mysqli_fetch_assoc($result)) {
    echo '0';
    
} else {
    //SQL语句
    $sql = "insert into fff values(null,'$u1','$p1')";
    //执行sql
    $result = mysqli_query($link, $sql);
    echo '1';

}

// $sql="insert into fff(name,pass) values('$u','$p')";
// //执行sql语句
// if(mysqli_query($link,$sql)){
//     echo "1";
// }else{
//     echo "0";
// }
// mysqli_query($link,$sql);
//关闭连接
mysqli_close($link);
?>