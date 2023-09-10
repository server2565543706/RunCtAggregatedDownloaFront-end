<template>
    <div>
        <el-button type="success" @click="ButtonExit">返回</el-button>
    </div>
</template>

<script setup lang="ts">
import router from "@/router";

const ButtonExit = () => {
    router.push("/")
}

</script>

<style scoped>

</style>