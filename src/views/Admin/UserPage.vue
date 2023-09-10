<template>
    <div>
        <el-scrollbar>
            <el-table :data="tableData">
                <el-table-column prop="Id" label="Id" width="140"/>
                <el-table-column prop="Name" label="Name" width="120"/>
                <el-table-column prop="Username" label="Username"/>
                <el-table-column prop="Password" label="Password"/>
                <el-table-column prop="Email" label="邮箱"/>
                <el-table-column prop="Access" label="权限"/>
                <el-table-column prop="Created" label="创建时间"/>
                <el-table-column label="用户控制">
                    <template #default="scope">
                        <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {Getinformation} from "@/plugins/MyAxios";
import {onMounted} from "vue";
import {ElMessage} from "element-plus";

interface User {
    Id: string;
    Name: string;
    Username: string;
    Password: string;
    Email: string;
    Access: string;
    Created: string;

}

const tableData = ref<User[]>([]);

onMounted(async () => {
    try {
        const response = await Getinformation.get("/api/getadmininformation", {withCredentials: true,});
        const res = response.data.user;
        tableData.value = res;
        // console.log(res)
    } catch (error) {
        console.error(error);
        ElMessage.error("错误!")
    }
});

const handleEdit = (row: any) => {
    // 处理编辑按钮点击事件
    console.log('编辑按钮点击', row);
};

const handleDelete = (row: any) => {
    // 处理删除按钮点击事件
    console.log('删除按钮点击', row);
};
</script>

<style scoped>

</style>