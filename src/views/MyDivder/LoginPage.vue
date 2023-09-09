<template>
    <div>
        <el-button text @click="dialogVisible1">
            {{ Logindate }}
        </el-button>
        <el-dialog
                v-model="dialogVisible"
                width="30%"
                :before-close="handleClose"
        >
            <ButtonVile v-show="Buttonvile"></ButtonVile>
            <template #footer>
      <span class="dialog-footer">
      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import {ref, toRef} from 'vue'
import {ElMessageBox} from 'element-plus'
import ButtonVile from "@/views/Login/ButtonVile.vue";
import {useStore} from 'vuex';
import ACCESSNUM from "@/access/ACCESSNUM";
import router from "@/router";

const dialogVisible = ref(false)
const Buttonvile = ref(true)
const Logindate = ref("登录")
const store = useStore() // 获取 Vuex store 实例
const autoLogin = async () => {
    await store.dispatch("user/tokenLoginUser"); // 将 "user" 替换为你的模块名
};
const loginUser = toRef(store.state.user, 'loginUser');
if (loginUser.value.userRole !== ACCESSNUM.NOT_LOGIN) {
    Logindate.value = "退出登录"

} else {
    autoLogin()
}
// 当userRole = noLogin时返回未true，不等于时假实现登录成功或不成功
const dialogVisible1 = () => {
    if (loginUser.value.userRole != ACCESSNUM.NOT_LOGIN) {
        dialogVisible.value = false
        const result = confirm("确定要删除token吗？");
        if (result) {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // 清除token
            router.push("/nologin");
        }
    } else {
        dialogVisible.value = true

    }

}


// 空白弹窗口
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('你还没有登录确定要取消吗')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

</script>

<style scoped>


.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>