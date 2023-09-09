// import { createStore } from 'vuex'
//
// export default createStore({
//   state: {
//     token: null,
//   },
//   getters: {
//     getToken(state) {
//       return state.token;
//     },
//   },
//   mutations: {
//     setToken(state, token) {
//       state.token = token;
//     },
//   },
//   actions: {
//     setToken({ commit }, token) {
//       commit('setToken', token);
//     },
//   },
//   modules: {
//   }
// })

import {createStore} from "vuex"
import user from "./user";

export default createStore({
        mutations: {},
        actions: {},
        modules: {
            user
        }
    }
)