<template>
    <div>
        <nav class="navbar nav-default navbar-fixed-top">
            <div class="container">
                <div class="container-header">
                    <button class="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#navbar"
                            aria-expanded="false"
                            aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <p class="icon-bar"></p>
                        <p class="icon-bar"></p>
                        <p class="icon-bar"></p>
                    </button>
                    <a href="index.html#!/index" class="navbar-brand">后台管理系统</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="index.html#!/index/home">主页</a></li>
                        <li><a href="index.html#!/index/statistics">统计</a></li>
                        <li><a href="index.html#!/index/record">数据录入</a></li>
                        <li><a href="index.html#!/index/management">人员管理</a></li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                               aria-haspopup="true" aria-expanded="false">用户名<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li>用户中心</li>
                                <li>退出</li>
                            </ul>

                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    </div>
</template>

<script>
    export default{
    };
</script>

<style>

</style>