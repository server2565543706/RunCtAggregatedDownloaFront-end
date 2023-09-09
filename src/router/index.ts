import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NoAuth from '@/views/NoAuth.vue';
import ACCESS_ENUM from "@/access/ACCESSNUM";
import InformationVile from "@/views/Login/InformationVile.vue";
import NoLoginView from "@/views/NoLogin/NoLoginView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/noauth',
        name: '报错',
        component: NoAuth,
    },
    {
        path: '/nologin',
        name: '退出登录',
        component: NoLoginView,
        meta: {
            access: ACCESS_ENUM.NOT_LOGIN
        },
    },
    {
        path: '/information',
        name: 'information',
        component: InformationVile,
        meta: {
            access: [ACCESS_ENUM.ADMIN, ACCESS_ENUM  .USER]
            // access: ACCESS_ENUM.ADMIN
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Admin/AdminPage.vue'),
        meta: {
            access: ACCESS_ENUM.ADMIN,
        },
    },
];

// 创建路由实例但不立即挂载
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
