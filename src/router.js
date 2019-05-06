import Vue from "vue";
import VueRouter from "vue-router";
// 模块化必须显式使用Vue.use来加载路由功能
Vue.use(VueRouter); 


import HelloWorld from "./components/HelloWorld.vue";

import Button from "./components/Button.vue";

// 定义路由
const routes = [
    { path: "/home", component: HelloWorld, name: "home" },
    { path: "/button", component: Button, name: "button" }
]


// 实例化路由
const router = new VueRouter({
    routes
});

// 暴露路由对象，为后续挂载容器做准备
export default router;