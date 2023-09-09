<template>
    <nav>
        <div></div>
    </nav>
    <router-view/>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import ACCESSNUM from "@/access/ACCESSNUM";
import {onMounted} from "vue";

const router = useRouter()
const store = useStore() // 获取 Vuex store 实例
const doInit = () => {
    // alert(1)
    router.beforeEach((to, from, next) => {
        if (to.meta?.access === ACCESSNUM.ADMIN) {
            if (store.state.user.loginUser?.userRole !== ACCESSNUM.ADMIN) {
                next("/noauth");
                return
            }
        }
        if (to.meta?.access === ACCESSNUM.USER) {
            if (store.state.user.loginUser?.userRole !== ACCESSNUM.USER) {
                next("/noauth");
                return
            }
        }
        next()
    })

}
onMounted(() => {
    doInit()
})


</script>

<style>

</style>
