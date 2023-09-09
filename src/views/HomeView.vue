<template>
    <div id="Network1">
        <HeadPage/>
    </div>
    <MyDivder/>
    <el-divider border-style="dashed"/>
    <div id="Network2">
        <TabulationPage/>
    </div>

</template>

<script setup lang="ts">
import MyDivder from "@/views/MyDivder/MyDivder.vue";
import HeadPage from "@/views/MyDivder/HeadPage.vue";
import TabulationPage from "@/views/MyDivder/TabulationPage.vue";
import {useStore} from "vuex";

import {onMounted} from "vue";

const store = useStore(); // 获取 Vuex store 实例

// 调用 tokenLoginUser action
// const autoLogin = async () => {
//     await store.dispatch("user/tokenLoginUser"); // 将 "user" 替换为你的模块名
// };
// // 在组件挂载后触发自动登录
// onMounted(autoLogin);

</script>

<style scoped>
#Network1 {

}
</style>