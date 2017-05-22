<template>
    <Row type="flex" justify="center" align="top" class="code-row-bg footer-container">
        <i-col span="6">
            <p class="footer-title">
                关于系统
            </p>
            <p class="footer-content">
                <Icon type="social-github"></Icon>
                <a href="https://github.com/JulianXG/ccwcc-vue/tree/dev" target="_blank">GitHub地址</a>
            </p>
            <p class="footer-content">
                <a href="http://ccwcc.kalyter.cn/api/swagger-ui.html"
                   target="_blank">后台API文档</a>
            </p>
            <p class="footer-content">
                <a v-link="{path:'/index/changeLog'}">更新日志</a>
            </p>
        </i-col>
        <i-col span="6">
            <p class="footer-title">
                关注我们
            </p>
            <p class="footer-content">
                <Icon type="android-share-alt"></Icon>
                <a href="http://weibo.com/3904529297" target="_blank">新浪微博</a>
            </p>
            <p class="footer-content">
                <Icon type="email"></Icon>
                xiaogangla@qq.com
            </p>
        </i-col>
        <i-col span="6">
            <p class="footer-title">
                社区
            </p>
            <p class="footer-content">
                QQ社区交流群:32869019
            </p>
            <p class="footer-content">
                <Icon type="bug"></Icon>
                <a href="https://github.com/JulianXG/ccwcc-vue/issues/new"
                   target="_blank">提交bug</a>
            </p>
        </i-col>
        <i-col span="6">
            <p class="footer-title">
                手机APP
            </p>
            <img src="../../assets/img/android_app_qrcode.png"
                 style="width:96px;height: 96px;">
        </i-col>
    </Row>
    <div class="license">
        ©中国水鸟调查后台管理系统（under GPL License），作者：肖刚 南京财经大学
    </div>
</template>
