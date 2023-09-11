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
                <el-table-column prop="Updated" label="更新时间"/>
                <el-table-column label="用户控制">
                    <template #default="scope">
                        <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>
        <el-drawer v-model="drawer" title="I am the title" :with-header="false">
            <span>{{ UserName }}用户编辑
            </span>
            <MyDivder/>
            <div>
                <EditAdminUserPage :toChild="Id" @fn="changeHome"></EditAdminUserPage>
            </div>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {Getinformation} from "@/plugins/MyAxios";
import {onMounted} from "vue";
import {Action, ElMessage, ElMessageBox} from "element-plus";
import MyDivder from "@/views/MyDivder/MyDivder.vue";
import EditAdminUserPage from "@/views/Admin/Dialog/EditAdminUserPage.vue";
import router from "@/router";


interface User {
    Id: string;
    Name: string;
    Username: string;
    Password: string;
    Email: string;
    Access: string;
    Created: string;
    Updated: string;

}

const tableData = ref<User[]>([]);
const Id = ref(0)

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
const drawer = ref(false)
const UserName = ref('')
const handleEdit = (row: any) => {
    drawer.value = true
    UserName.value = row.Name
    Id.value = row.Id
    // 处理编辑按钮点击事件
    // console.log('编辑按钮点击', row);
};
const changeHome = (n: boolean) => {
    // console.log(n);
    if (n) {
        drawer.value = false;
    }
}
const handleDelete = (row: any) => {
    // 处理删除按钮点击事件
    // console.log('删除按钮点击', row);


    ElMessageBox.confirm(
        '',
        '确定要删除吗',
        {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }
    )
        .then(() => {
            const userData = {
                Id: row.Id,
            };
            Getinformation.post("/api/deleteuser", JSON.stringify(userData), {
                headers: {
                    'Content-Type': 'application/json', // 指定请求的 Content-Type 为 JSON
                }, withCredentials: true,
            }).then(res => {
                ElMessage.success("删除成功")
            }).catch((error) => {
                console.log(error)
                ElMessage.warning("删除失败")
            })
        })
        .catch((action: Action) => {
            ElMessage({
                type: 'info',
                message:
                    action === 'cancel'
                        ? '你取消了'
                        : '你取消了',
            })
        })


};
</script>

<style scoped>

</style>