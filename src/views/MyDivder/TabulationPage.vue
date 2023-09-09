<template>
    <div id="Netowrk">
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="Name" prop="name"/>
            <el-table-column label="Notes" prop="notes"/>
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="搜索"/>
                </template>
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleDownload(scope.row.connect)">Download
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script setup lang="ts">
import {onMounted, ref, computed} from 'vue';
import {ElMessage} from "element-plus";
import {Getinformation} from "@/plugins/MyAxios";

interface User {
    notes: string;
    name: string;
    connect: string;
}

const search = ref('');
const responseData: User[] = [];
const tableData = ref<User[]>([]);

onMounted(async () => {
    try {
        const response = await Getinformation.get("/api/information");
        const res = response.data.user;
        // console.log(res);

        res.forEach((item: { Name: string, Connect: string, Notes: string }) => {
            responseData.push({
                name: item.Name,
                connect: item.Connect,
                notes: item.Notes,
            });
        });

        // 更新tableData
        tableData.value = [
            ...responseData,
        ];
    } catch (error) {
        console.error(error);
        ElMessage.error("错误!")
    }
});

const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
);

const handleDownload = (url: string) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = getDownloadFileName(url);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    ElMessage.success("下载中");
};
const getDownloadFileName = (url: string) => {
    // 从下载链接中提取文件名，可以根据实际情况进行处理
    return url.substring(url.lastIndexOf('/') + 1);
};
</script>

<style scoped>
</style>