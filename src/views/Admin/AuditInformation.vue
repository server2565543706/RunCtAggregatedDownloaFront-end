<template>
    <div>
        <el-scrollbar>
            <el-table :data="tableData">
                <el-table-column prop="Id" label="Id" width="140"/>
                <el-table-column prop="Name" label="名称" width="120"/>
                <el-table-column prop="Connect" label="下载链接"/>
                <el-table-column prop="Notes" label="备注"/>
                <el-table-column prop="Created" label="创建时间"/>
                <el-table-column prop="Updated" label="更新时间"/>
                <el-table-column prop="SubmitUser" label="归属用户"/>
                <el-table-column label="内容控制">
                    <template #default="scope">
                        <el-button type="primary" @click="handleEdit(scope.row)">通过</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">驳回</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {Getinformation} from "@/plugins/MyAxios";
import {ElMessage} from "element-plus";

interface User {
    Id: string;
    Name: string;
    Connect: string;
    Notes: string;
    SubmitUser: string,
    Created: string;
    Updated: string;

}

const tableData = ref<User[]>([]);
onMounted(async () => {
    try {
        const response = await Getinformation.get("/api/getauditinformation", {withCredentials: true,});
        // console.log(res);
        const res = response.data.user;
        tableData.value = res;
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