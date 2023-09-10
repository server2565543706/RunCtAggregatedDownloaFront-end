<template>
    <div>你没权限来操作
        <el-button type="warning" @click="Button">回去登录</el-button>
    </div>
</template>

<script setup lang="ts">
import router from "@/router";

const Button = () => {
    router.push("/")
}
</script>

<style scoped>

</style>