<template>
    <div>
        <el-form :model="form" label-width="120px">
            <el-form-item label="修改用户名">
                <el-input v-model="form.name"/>
            </el-form-item>
            <el-form-item label="修改密码">
                <el-input v-model="form.password"/>
            </el-form-item>
            <el-form-item label="修改邮箱">
                <el-input v-model="form.email"/>
            </el-form-item>
            <el-form-item label="修改权限">
                <el-select v-model="form.region" placeholder="权限">
                    <el-option label="admin" value="admin"/>
                    <el-option label="user" value="user"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import {reactive, defineProps, defineEmits} from "vue";
import {Getinformation} from "@/plugins/MyAxios";
import {ElMessage} from "element-plus";


const form = reactive({
    name: '',
    password: '',
    email: '',
    region: '',
})
const props = defineProps({
    toChild: Number // 此处使用Number类型来定义prop
});
const emit = defineEmits<{
    (e: "fn", id: boolean): void;
}>();
const onSubmit = () => {
    if (form.name !== '' && form.password !== '' && form.email !== '' && form.region !== '') {
        const userData = {
            Id: props.toChild,
            name: form.name,
            password: form.password,
            email: form.email,
            access: form.region
        };
        Getinformation.post("/api/updateuser", JSON.stringify(userData), {
            headers: {
                'Content-Type': 'application/json', // 指定请求的 Content-Type 为 JSON
            }, withCredentials: true,
        }).then(res => {
            ElMessage.success("更新成功")
            emit("fn", true);
            form.name = ''
            form.password = ''
            form.email = ''
            form.region = ''
        }).catch((error) => {
            ElMessage.warning("更新失败")
        })
    } else {
        ElMessage.warning("不要填空")
    }

}
</script>

<style scoped>

</style>