<template>
    <div id="HeadViews">
        <el-text class="mx-1" type="success" size="large">用户名：{{ loginUser.userName }}</el-text>

    </div>
</template>

<script setup lang="ts">
import {useStore} from 'vuex';
import {toRef} from "vue";

const store = useStore() // 获取 Vuex store 实例

const loginUser = toRef(store.state.user, 'loginUser');



</script>

<style scoped>
#HeadViews {
    display: flex;
    flex-direction: column; /* 垂直布局 */
    /*justify-content: center; !* 垂直居中 *!*/
    min-height: 100vh; /* 最小高度为视口高度，以使内容充满整个屏幕 */
}

</style>