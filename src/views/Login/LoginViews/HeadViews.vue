<template>
    <div id="HeadViews">
        <el-text class="mx-1" type="success" size="large">{{ submitUser }}</el-text>
    </div>
    <MyDivder/>
    <div id="HeadViews1">
        <div style="margin: 20px"/>
        <el-form
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
        >
            <el-form-item label="名字">
                <el-input v-model="formLabelAlign.name"/>
            </el-form-item>
            <el-form-item label="下载地址">
                <el-input v-model="formLabelAlign.download"/>
            </el-form-item>
            <el-form-item label="备注内容">
                <el-input v-model="formLabelAlign.notes"/>
            </el-form-item>
        </el-form>
        <el-button type="primary" class="custom-button" @click="ButtonGet">添加</el-button>

    </div>

</template>

<script setup lang="ts">
import {useStore} from 'vuex';
import {toRef, reactive, ref} from "vue";
import MyDivder from "@/views/MyDivder/MyDivder.vue";
import {ElMessage} from "element-plus";
import {Getinformation} from "@/plugins/MyAxios";
import router from "@/router";

const store = useStore() // 获取 Vuex store 实例

const loginUser = toRef(store.state.user, 'loginUser');


const formLabelAlign = reactive({
    name: '',
    download: '',
    notes: '',
})
const submitUser = loginUser.value.userName

const ButtonGet = () => {
    if (formLabelAlign.name !== '' && formLabelAlign.download !== '' && formLabelAlign.notes != '') {
        const userData = {
            name: formLabelAlign.name,
            download: formLabelAlign.download,
            notes: formLabelAlign.notes,
            submitUser: submitUser
        };
        Getinformation.post("/api/addinformation", JSON.stringify(userData), {
            headers: {
                'Content-Type': 'application/json', // 指定请求的 Content-Type 为 JSON
            },
            withCredentials: true,
        }).then(res => {
            console.log(res.data.message)
            ElMessage.success("添加成功！")
        }).catch((error) => {
            console.error("error", error);
            ElMessage.warning("添加失败！");
        });
    } else {
        ElMessage.warning("请不要以空提交")
    }

}

</script>

<style scoped>
#HeadViews {
    display: flex;
    flex-direction: column; /* 垂直布局 */
    /*justify-content: center; !* 垂直居中 *!*/
}

#HeadViews1 {
    display: flex;
    flex-direction: column; /* 垂直布局 */
    align-items: center; /* 水平居中 */
    margin-right: 100px; /* 根据需要调整右外边距 */

}

.custom-button {
    width: 190px; /* 根据需要调整宽度 */
    margin-right: -100px; /* 根据需要调整右外边距 */
}

.mx-1 {
    margin-right: 20px; /* 根据需要调整右外边距 */
}
</style>