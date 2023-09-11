<template>
    <div>
        <el-form :model="form" label-width="120px">
            <el-form-item label="用户名">
                <el-input v-model="form.name"/>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="form.username"/>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"/>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email"/>
            </el-form-item>
            <el-form-item label="权限">
                <el-select v-model="form.region" placeholder="权限">
                    <el-option label="admin" value="admin"/>
                    <el-option label="user" value="user"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import {reactive, defineEmits} from 'vue'
import {ElMessage} from "element-plus";
import {Getinformation} from "@/plugins/MyAxios";

// do not use same name with ref
const form = reactive({
    name: '',
    username: '',
    password: '',
    email: '',
    region: '',
})
const emit = defineEmits<{
    (e: "fn", id: boolean): void;
}>();
const onSubmit = () => {
    if (form.name !== '' && form.username !== '' && form.password !== '' && form.email !== '' && form.region !== '') {
        const userData = {
            name: form.name,
            username: form.username,
            password: form.password,
            email: form.email,
            access: form.region
        };
        Getinformation.post("/api/addadministratorinformation", JSON.stringify(userData), {
            headers: {
                'Content-Type': 'application/json', // 指定请求的 Content-Type 为 JSON
            }, withCredentials: true,
        }).then(res => {
                // console.log(res)
                ElMessage.success("添加成功")
                emit("fn", true);
                form.name = ''
                form.username = ''
                form.password = ''
                form.email = ''
                form.region = ''
            }
        ).catch((error) => {
            console.error("error", error.response.data);
            ElMessage.warning("添加失败！账号或名称重复!");
        })
    } else {
        ElMessage.warning("不能为空")
    }
}
</script>

<style scoped>

</style>