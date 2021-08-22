<?php
$page = !empty($_GET['page'])?$_GET['page']:"login";

$path = "pages/{$page}.html";
#4
if(file_exists($path))
{
    require $path;
}else{
    require "pages/404.html";
}
?>
