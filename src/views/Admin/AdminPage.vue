<template>
    <div id="AdminViews">
        <el-container class="layout-container-demo" style="height: 500px">
            <el-aside width="200px">
                <el-scrollbar>
                    <el-menu :default-openeds="['1', '3']">
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon>
                                    <message/>
                                </el-icon>
                                服务器信息
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1" @click="navigateToUserPage('index')">服务器允许情况
                                </el-menu-item>
                                <el-menu-item index="1-2" @click="navigateToUserPage('user')">用户</el-menu-item>
                            </el-menu-item-group>
                            <el-sub-menu index="1-4">
                                <template #title>Option4</template>
                                <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
                            </el-sub-menu>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon>
                                    <icon-menu/>
                                </el-icon>
                                内容信息
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1" @click="navigateToUserPage('tabulation')">所有信息
                                </el-menu-item>
                                <el-menu-item index="2-2" @click="navigateToUserPage('auditinformation')">审核信息
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon>
                                    <setting/>
                                </el-icon>
                                服务器设置
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="3-1">Option 1</el-menu-item>
                                <el-menu-item index="3-2">Option 2</el-menu-item>
                            </el-menu-item-group>
                            <el-sub-menu index="3-4">
                                <template #title>Option 4</template>
                                <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
                            </el-sub-menu>
                        </el-sub-menu>
                    </el-menu>
                </el-scrollbar>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <div class="toolbar">
                        <el-button type="success" v-show="ButtonFlase">添加用户</el-button>
                        <el-button type="success" v-show="Buttontabulation">添加内容</el-button>
                        <el-button type="success" @click="GetExit">返回</el-button>
                    </div>
                </el-header>

                <el-main>
                    <router-view></router-view> <!-- 使用 <router-view> 动态渲染子页面内容 -->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import {Menu as IconMenu, Message, Setting} from '@element-plus/icons-vue'
import router from '@/router';
import {ref, watch} from "vue";
import {useRoute} from 'vue-router'; // 导入 useRoute

const route = useRoute(); // 使用 useRoute 获取当前路由信息
const routerPath = ref(route.fullPath);
const ButtonFlase = ref(false)
const Buttontabulation = ref(false)

// 使用 watch 监听 route.fullPath 的变化
watch(() => route.fullPath, (to, from) => {
    // 在路由变化时更新 routerPath 的值
    routerPath.value = to;
    if (routerPath.value === '/admin/user') {
        ButtonFlase.value = true; // 当路由为 /admin/user 时显示按钮
        Buttontabulation.value = false
    } else if (routerPath.value === '/admin/tabulation') {
        ButtonFlase.value = false; // 隐藏用户按钮
        Buttontabulation.value = true
    } else {
        ButtonFlase.value = false; // 其他路由隐藏按钮
        Buttontabulation.value = false
    }
});


const GetExit = () => {
    router.push("/")
}
const navigateToUserPage = (moduleName: any) => {
    // 使用路由导航到用户页面，假设路由中定义了名为 "user" 的子路由
    router.push({name: moduleName}); // 根据实际路由配置进行设置
};

</script>

<style scoped>
#AdminViews {
    min-height: 100vh; /* 最小高度为视口高度，以使内容充满整个屏幕 */

    flex-direction: column; /* 垂直布局 */
    display: flex;
}

.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>