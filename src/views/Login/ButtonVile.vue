<template>
    <div id="Network4">
        <h1>登录</h1>
        <el-input v-model="username" placeholder="Username"/>
        <el-input
                v-model="password"
                type="password"
                placeholder="Password"
                show-password
        />
        <MyDivder/>
        <el-button type="success" @click="Login">登录</el-button>
    </div>

</template>

<script setup lang="ts">

import {ref,defineEmits} from "vue";
import {ElMessage} from "element-plus";
import {Getinformation} from "@/plugins/MyAxios";
import MyDivder from "@/views/MyDivder/MyDivder.vue";
import {useStore} from "vuex";
import router from "@/router";
//
const username = ref('')
const password = ref('')
// 存储Token
const setCookie = (name: string, value: string, days: number) => {
    // 创建一个当前时间的Date对象
    const date = new Date();
    // 计算过期时间（毫秒）
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    // 将过期时间转换为UTC字符串格式
    const expires = "expires=" + date.toUTCString();
    // 设置Cookie，包括名称、值、过期时间和路径
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
};
// 登录获取Token跳转到登录后的页面
const store = useStore() // 获取 Vuex store 实例


const Login = () => {
    ElMessage.success("登录中")
    const userData = {
        username: username.value,
        password: password.value,
    };
    Getinformation.post("/api/getadministratorinformation", JSON.stringify(userData), {
        headers: {
            'Content-Type': 'application/json' // 指定请求的 Content-Type 为 JSON
        }
    }).then(res => {
        // console.log(res.data.Token)
        ElMessage.success("登录成功！")

        setCookie("token", res.data.Token, 7);
        setTimeout(() => {
                store.dispatch('user/getLoginUser', {
                    userName: res.data.Name,
                    userRole: res.data.Access,
                })
                router.push("/information");

            }
        )
    }).catch((error) => {
        console.error("error", error);
        ElMessage.warning("登录失败！");
    });
}
</script>

<style scoped>
#Network4 {
    text-align: center; /* 水平居中对齐 */

}
</style>