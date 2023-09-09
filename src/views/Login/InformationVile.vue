<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <TabViews/>
            </el-header>
            <MyDivder/>
            <el-main>
                <HeadViews/>
            </el-main>
            <el-footer>{{loginUser.userRole}}</el-footer>
        </el-container>

    </div>
</template>

<script setup lang="ts">

import TabViews from "@/views/Login/LoginViews/TabViews.vue";
import HeadViews from "@/views/Login/LoginViews/HeadViews.vue";
import MyDivder from "@/views/MyDivder/MyDivder.vue";
import {useStore} from "vuex";
import {toRef} from "vue";
import ACCESSNUM from "@/access/ACCESSNUM";
import router from "@/router";

const store = useStore() // 获取 Vuex store 实例
const loginUser = toRef(store.state.user, 'loginUser');
if (loginUser.value.userRole === ACCESSNUM.NOT_LOGIN){
    router.push("/noauth")
}


</script>

<style scoped>
.common-layout {
    display: flex;
    flex-direction: column; /* 垂直布局 */
    justify-content: center; /* 垂直居中 */
    min-height: 100vh; /* 最小高度为视口高度，以使内容充满整个屏幕 */
}

</style>