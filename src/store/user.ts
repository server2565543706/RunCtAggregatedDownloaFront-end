import {StoreOptions} from "vuex";
import ACCESSNUM from "@/access/ACCESSNUM";
import { ElMessage } from "element-plus"; // 请确保导入了 Element Plus 的消息组件
import { Getinformation } from "@/plugins/MyAxios";
import router from "@/router"; // 导入用于发送请求的 API 模块
const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
};

export default {
    namespaced: true,
    state: () => ({
        loginUser: {
            userName: "未登录",
            userRole: ACCESSNUM.NOT_LOGIN,
        }
    }),
    actions: {
        getLoginUser({commit, state}, payload) {
            commit("updateUser", payload)
        },
        async tokenLoginUser({ commit }) {
            const token = getCookie("token");
            if (token) {
                // 构建请求头，包括 Cookie
                const userData = {
                    token: token,
                };
                try {
                    // 发送请求
                    const res = await Getinformation.post(
                        "/api/gettokeninformation",
                        JSON.stringify(userData),
                        {
                            headers: { "Content-Type": "application/json" },
                        }
                    );

                    // 如果登录成功，更新用户信息
                    commit("updateUser", {
                        userName: res.data.name,
                        userRole: res.data.access, // 假设这里是用户角色，你可以根据实际情况设置角色
                    });

                    ElMessage.success("欢迎用户|" + res.data.name + "|自动登录成功");
                    await router.push("/information");
                } catch (error) {
                    console.error("自动登录失败", error);
                    ElMessage.warning("自动登录失败");
                }
            }
        },
    },
    mutations: {
        updateUser(state, payload) {
            state.loginUser = payload;
        },
    },

} as StoreOptions<any>