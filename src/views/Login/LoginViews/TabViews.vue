<template>
    <div id="TabViews1">
        <el-page-header class="titleClass" @back="goBack" title="返回到主页">
            <template #content>
                <span class="text-large font-600 mr-3"> {{ TabViews }}</span>
            </template>
        </el-page-header>
        <my-divder/>
        <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="50"
                status="exception"
        >
            <span>负载情况</span>
        </el-progress>
    </div>
    <el-divider border-style="dashed"/>
</template>

<script setup lang="ts">
import router from "@/router";
import MyDivder from "@/views/MyDivder/MyDivder.vue";
import {toRef, ref} from "vue";
import {useStore} from "vuex";
import ACCESSNUM from "@/access/ACCESSNUM";

const store = useStore() // 获取 Vuex store 实例

const loginUser = toRef(store.state.user, 'loginUser');
const TabViews = ref('用户信息')
if (loginUser.value.userRole === ACCESSNUM.ADMIN) {
    TabViews.value = "你好亲爱的|" + loginUser.value.userName + "|管理员"
} else {
    TabViews.value = "你好亲爱的|" + loginUser.value.userName + "|用户"
}

const goBack = () => {
    router.push("/");
}

</script>

<style scoped>
.titleClass {
}

.percentage-value {
    display: block;
    margin-top: 10px;
    font-size: 28px;
}

.percentage-label {
    display: block;
    margin-top: 10px;
    font-size: 12px;
}

.demo-progress .el-progress--line {
    margin-bottom: 15px;
    width: 350px;
}

.demo-progress .el-progress--circle {
    margin-right: 15px;
}

</style>