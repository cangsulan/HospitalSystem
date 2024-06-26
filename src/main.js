import {
    createApp
} from "vue";

import App from "./App.vue";
import router from "./routers/router";

import pinia from "./pinia";
const app = createApp(App);

app.use(router);
app.use(pinia);

import {
    defineUser
} from "./store/userStore.js";
let sysUser = defineUser();

window.addEventListener("storage", () => {
    if (localStorage.getItem("uid") != sysUser.uid ||
        localStorage.getItem("userRole") != sysUser.userRole ||
        localStorage.getItem("userPwd") != sysUser.userPwd ||
        localStorage.getItem("username") != sysUser.username
    ) {
        //那么就判定登录状态已经改变
        // 清除所有pinia数据
        sysUser.$reset()
        sysAdmin.$reset()
        sysPatient.$reset()
        sysDocter.$reset()
        schedule.$reset()
        patientSchedule.$reset()
        userList.$reset()

        router.push("/login");

    }
    if (localStorage.getItem("uid") == null || localStorage.getItem("uid") < 0) {
        //那么就判定登录状态已经改变
        // 清除所有pinia数据
        sysUser.$reset()
        sysAdmin.$reset()
        sysPatient.$reset()
        sysDocter.$reset()
        schedule.$reset()
        patientSchedule.$reset()
        userList.$reset()

        router.push("/login");

    }
})
sysUser.$subscribe((mutations, state) => {
    if (state.username == "" || state.username == null) {
        router.push("/login");
    }
})
app.mount("#app");