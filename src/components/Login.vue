<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import { defineUser } from "../store/userStore.js";
let sysUser = defineUser();
import { definePatient } from "../store/patientStore.js";
let patient = definePatient();
import { defineAdmin } from "../store/adminStore.js";
let admin = defineAdmin();
import { defineDocter } from "../store/docterStore.js";
let docter = defineDocter();

import request from "../utils/request";

let loginUser = reactive({
    username: "",
    userPwd: "",
    userRole: "patient",
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
        alert("输入不符合要求！")
        return;
    }
    //分情况发送：
    if (loginUser.userRole == 'patient') {
        let { data } = await request.post("login/patient", {
            userName: loginUser.username,
            password: loginUser.userPwd,
        });
        if (data.code == 200) {
            alert("登录成功");
            let userData = data;
            // 获得登录的用户信息,更新到pinia中,这里我只要后续有用的信息，所以不要提供密码
            sysUser.uid = userData.data.uid;
            sysUser.username = userData.data.username;
            sysUser.userRole = "patient";
            if (userData.data.userChecked == 0) {
                sysUser.userChecked = "待审核"
            } else {
                sysUser.userChecked = "已通过"
            }
            sysUser.userPwd = userData.data.userPwd;
            sysUser.idCard = userData.data.idCard;
            sysUser.realName = userData.data.realName;
            sysUser.address = userData.data.address;
            sysUser.phone = userData.data.phone;
            sysUser.userPwd = loginUser.userPwd;

            patient.idCard = userData.data.idCard;
            patient.realName = userData.data.realName;
            patient.age = userData.data.age;
            patient.gender = userData.data.gender;
            patient.address = userData.data.address;
            patient.phone = userData.data.phone;
            patient.medicalHistory = userData.data.medicalHistory;

            router.push("/patienthome");
        } else {
            alert("登录失败");
        }
    }
    if (loginUser.userRole == 'doctor') {
        let { data } = await request.post("login/doctor", {
            userName: loginUser.username,
            password: loginUser.userPwd,
        });
        if (data.code == 200) {
            alert("登录成功");
            let userData = data;
            // 获得登录的用户信息,更新到pinia中,这里我只要后续有用的信息，所以不要提供密码
            sysUser.uid = userData.data.uid;
            sysUser.username = userData.data.username;
            sysUser.userRole = "doctor";
            if (userData.data.userChecked == 0) {
                sysUser.userChecked = "待审核"
            } else {
                sysUser.userChecked = "已通过"
            }
            sysUser.userPwd = userData.data.userPwd;
            sysUser.idCard = userData.data.idCard;
            sysUser.realName = userData.data.realName;
            sysUser.address = userData.data.address;
            sysUser.phone = userData.data.phone;
            sysUser.userPwd = loginUser.userPwd;

            docter.idCard = userData.data.idCard;
            docter.realName = userData.data.realName;
            docter.age = userData.data.age;
            docter.gender = userData.data.gender;
            docter.address = userData.data.address;
            docter.phone = userData.data.phone;
            docter.hospital = userData.data.hospital;
            docter.office = userData.data.office;
            docter.title = userData.data.title;
            docter.speciality = userData.data.speciality;
            router.push("/docterhome");

        } else {
            alert("登录失败");
        }
    }
    if (loginUser.userRole == 'admin') {
        let { data } = await request.post("login/admin", {
            userName: loginUser.username,
            password: loginUser.userPwd,
        });
        if (data.code == 200) {
            alert("登录成功");
            let userData = data;
            // 获得登录的用户信息,更新到pinia中,这里我只要后续有用的信息，所以不要提供密码
            sysUser.uid = userData.data.uid;
            sysUser.username = userData.data.username;
            sysUser.userRole = "admin";
            if (userData.data.userChecked == 0) {
                sysUser.userChecked = "待审核"
            } else {
                sysUser.userChecked = "已通过"
            }
            sysUser.userPwd = userData.data.userPwd;
            sysUser.idCard = userData.data.idCard;
            sysUser.realName = userData.data.realName;
            sysUser.address = userData.data.address;
            sysUser.phone = userData.data.phone;
            sysUser.userPwd = loginUser.userPwd;

            admin.idCard = userData.data.idCard;
            admin.realName = userData.data.realName;
            admin.address = userData.data.address;
            admin.phone = userData.data.phone;
            if (sysUser.username == "admin" && sysUser.userPwd == "admin") {
                router.push("/changePwd");
            }
            router.push("/adminhome");
        } else {
            alert("登录失败");
        }
    }

}

function clearForm() {
    usernameMsg.value = "";
    userPwdMsg.value = "";
    loginUser.userPwd = "";
    loginUser.username = "";
    loginUser.userRole = "patient";
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
                <td>身份</td>
                <td>
                    <input type="radio" name="userRole" v-model="loginUser.userRole" value="admin">管理员
                    <input type="radio" name="userRole" v-model="loginUser.userRole" value="doctor">医生
                    <input type="radio" name="userRole" v-model="loginUser.userRole" value="patient">患者
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
    width: 60%;
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
