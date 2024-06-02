<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import { defineUser } from "../store/userStore.js";
let sysUser = defineUser();
import request from "../utils/request";

let loginUser = reactive({
    username: "",
    userPwd: "",
});

let usernameMsg = ref("");
let userPwdMsg = ref("");

function checkUsername() {
    let usernameReg = /^[a-zA-Z0-9]{5,10}$/;
    if (!usernameReg.test(loginUser.username)) {
        usernameMsg.value = "格式有误";
        return false;
    }
    usernameMsg.value = "OK";
    return true;
}

function checkUserPwd() {
    let userPwdReg = /^[a-zA-Z0-9]{6,16}$/;

    if (!userPwdReg.test(loginUser.userPwd)) {
        userPwdMsg.value = "格式有误";
        return false;
    }

    userPwdMsg.value = "OK";
    return true;
}

async function login() {
    // 表单数据格式都正确再提交
    let flag1 = checkUsername();
    let flag2 = checkUserPwd();
    if (!(flag1 && flag2)) {
        return;
    }
    let { data } = await request.post("user/login", loginUser);
    if (data.code == 200) {
        alert("登录成功");
        console.log(data);
        // 获得登录的用户信息,更新到pinia中,这里我只要后续有用的信息，所以不要提供密码
        sysUser.uid = data.data.loginUser.uid;
        sysUser.username = data.data.loginUser.username;
        sysUser.userRole = data.data.loginUser.userRole;
        sysUser.userChecked = data.data.loginUser.userChecked;



        sysUser.userPwd = loginUser.userPwd;
        if (sysUser.username == "admin" && sysUser.userPwd == "admin") {
            router.push("/changePwd");
        }
        //这里做一下判定，看账户有没有通过审核，这块先交给后端判定
        //根据用户身份来跳转：
        if (sysUser.userRole == "patient") {
            router.push("/patienthome");
        } else if (sysUser.userRole == "doctor") {
            router.push("/docterhome");
        } else if (sysUser.userRole == "admin") {
            router.push("/adminhome");
        }
    } else if (data.code == 501) {
        alert("密码有误");
    } else if (data.code == 502) {
        alert("用户名有误");
    } else if (data.code == 503) {
        alert("账户还未通过审核");
    } else {
        alert("未知错误");
    }
}

function clearForm() {
    usernameMsg.value = "";
    userPwdMsg.value = "";
    loginUser.userPwd = "";
    loginUser.username = "";
}
</script>

<template>
    <div>
        <h3 class="ht">请登录</h3>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <td>请输入账号</td>
                <td>
                    <input class="ipt" type="text" v-model="loginUser.username" @blur="checkUsername()" />
                    <span id="usernameMsg" v-text="usernameMsg"></span>
                </td>
            </tr>
            <tr class="ltr">
                <td>请输入密码</td>
                <td>
                    <input class="ipt" type="password" v-model="loginUser.userPwd" @blur="checkUserPwd()" />
                    <span id="userPwdMsg" v-text="userPwdMsg"></span>
                </td>
            </tr>
            <tr class="ltr">
                <td colspan="2" class="buttonContainer">
                    <input class="btn1" type="button" @click="login()" value="登录" />
                    <input class="btn1" type="button" @click="clearForm()" value="重置" />
                    <router-link to="/regist">
                        <button class="btn1">去注册</button>
                    </router-link>
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
.ht {
    text-align: center;
    color: cadetblue;
    font-family: 幼圆;
}

.tab {
    width: 500px;
    border: 5px solid cadetblue;
    margin: 0px auto;
    border-radius: 5px;
    font-family: 幼圆;
}

.ltr td {
    border: 1px solid powderblue;
}

.ipt {
    border: 0px;
    width: 50%;
}

.btn1 {
    border: 2px solid powderblue;
    border-radius: 4px;
    width: 60px;
    background-color: antiquewhite;
}

#usernameMsg,
#userPwdMsg {
    color: gold;
}

.buttonContainer {
    text-align: center;
}
</style>
