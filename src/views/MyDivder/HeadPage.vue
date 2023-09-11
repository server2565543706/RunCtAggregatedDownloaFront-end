<template>
    <div id="Netowrk">
        <h3 class="large-bold">RunCtf聚合下载平台</h3>
        <div class="login">
            <LoginPage/>
        </div>
        <div class="login_addr">
            <router-link to="/information" v-show="showButton1">
                <el-button type="warning">个人信息</el-button>
            </router-link>
        </div>
        <div class="login_addr">
            <router-link to="/admin" v-show="showButton">
                <el-button type="warning">管理页面</el-button>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">

import LoginPage from "@/views/MyDivder/LoginPage.vue";
import {computed, toRef} from "vue";
import {useStore} from "vuex";
import ACCESSNUM from "@/access/ACCESSNUM";

const store = useStore() // 获取 Vuex store 实例
const loginUser = toRef(store.state.user, 'loginUser');

const showButton = computed(() => {
    // console.log('loginUser:', loginUser.value);
    // console.log('ACCESSNUM.ADMIN:', ACCESSNUM.ADMIN);
    // 使用计算属性根据用户角色动态计算按钮是否显示
    return loginUser.value.userRole === ACCESSNUM.ADMIN; // 访问 ref 的值
});
const showButton1 = computed(() => {
    // console.log('loginUser:', loginUser.value);
    // console.log('ACCESSNUM.ADMIN:', ACCESSNUM.ADMIN);
    // 使用计算属性根据用户角色动态计算按钮是否显示
    return loginUser.value.userRole === ACCESSNUM.USER || loginUser.value.userRole === ACCESSNUM.ADMIN; // 访问 ref 的值
});


</script>

<style scoped>
#Netowrk {
    /*background-color: blue; !* 蓝色背景 *!*/
    width: calc(100% - 40px); /* 宽度为父元素宽度减去左右各20px的间距 */
    height: 60px; /* 高度为20px */
    margin-left: 20px; /* 左边距为20px */
    margin-right: 20px; /* 右边距为20px */
}

.large-bold {
    display: inline-block;
    font-weight: bold;
    font-size: 30px;
}

.login {
    font-size: 72px;
    font-weight: bold;
    display: inline-block;
    float: right; /* 将元素向右浮动 */
    margin-right: 30px; /* 设置右侧间距为 30px */
}

.login_addr {
    font-size: 72px;
    font-weight: bold;
    display: inline-block;
    float: right; /* 将元素向右浮动 */
    margin-right: 30px; /* 设置右侧间距为 30px */
}
</style>