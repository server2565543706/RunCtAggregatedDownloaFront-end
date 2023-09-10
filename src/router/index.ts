import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NoAuth from '@/views/NoAuth.vue';
import ACCESS_ENUM from "@/access/ACCESSNUM";
import InformationVile from "@/views/Login/InformationVile.vue";
import NoLoginView from "@/views/NoLogin/NoLoginView.vue";
import {meta} from "@typescript-eslint/parser";

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
            access: [ACCESS_ENUM.ADMIN, ACCESS_ENUM.USER]
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
        children: [
            {
                path: '',
                alias: 'index',
                name: 'index',
                component: () =>
                    import(/* webpackChunkName: "index" */ '../views/Admin/IndexPage.vue'),
            },
            {
                path: 'user', // 子路由路径，例如：/admin/user
                name: 'user', // 子路由名称
                component: () =>
                    import(/* webpackChunkName: "user" */ '../views/Admin/UserPage.vue'), // 子路由组件
            },
            {
                path: "tabulation",
                name: "tabulation",
                component: () =>
                    import(/* webpackChunkName: "tabulation" */ '../views/Admin/TabulationPage.vue'), // 子路由组件
            }, {
                path: "auditinformation",
                name: "auditinformation",
                component: () => import(/* webpackChunkName: "auditinformation" */ '../views/Admin/AuditInformation.vue')
            },
        ],
    },
];

// 创建路由实例但不立即挂载
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
