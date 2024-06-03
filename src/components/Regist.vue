<script setup>
import { ref, reactive } from 'vue'
/* 导入发送请求的axios对象 */
import request from '../utils/request'

import { useRouter } from 'vue-router'
const router = useRouter()

let registUser = reactive({
    username: "",//账户的用户名
    userPwd: "",//密码
    userRole: "patient",//身份
    userIdCard: "",//身份证号
    userRealName: "",//真实姓名
    userAddress: "",//住址
    userPhone: "",//联系电话

})

let usernameMsg = ref('')
let userPwdMsg = ref('')
let reUserPwdMsg = ref('')
let reUserPwd = ref('')
let userIdCardMsg = ref('')


async function checkUserIdCard() {
    let userIdCardReg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (!userIdCardReg.test(registUser.userIdCard)) {
        userIdCardMsg.value = "格式有误"
        return false
    }
    userIdCardMsg.value = "OK"
    return true
}

async function checkUsername() {
    let usernameReg = /^[a-zA-Z0-9]{5,10}$/
    if (!usernameReg.test(registUser.username)) {
        usernameMsg.value = "格式有误"
        return false
    }
    // // 发送异步请求   继续校验用户名是否被占用
    // let { data } = await request.post(`user/checkUsernameUsed?username=${registUser.username}`)
    // if (data.code != 200) {
    //     usernameMsg.value = "用户名占用"
    //     return false
    // }
    usernameMsg.value = "OK"
    return true
}

async function checkUserPwd() {
    let userPwdReg = /^[a-zA-Z0-9]{6,16}$/
    if (!userPwdReg.test(registUser.userPwd)) {
        userPwdMsg.value = "格式有误"
        return false
    }
    userPwdMsg.value = "OK"
    return true
}

async function checkReUserPwd() {
    let userPwdReg = /^[a-zA-Z0-9]{6,16}$/
    if (!userPwdReg.test(reUserPwd.value)) {
        reUserPwdMsg.value = "格式有误"
        return false
    }
    if (registUser.userPwd != reUserPwd.value) {
        reUserPwdMsg.value = "两次密码不一致"
        return false
    }
    reUserPwdMsg.value = "OK"
    return true
}

// 注册的方法
async function regist() {
    // 校验所有的输入框是否合法
    let flag1 = await checkUsername()
    let flag2 = await checkUserPwd()
    let flag3 = await checkReUserPwd()
    let flag4 = await checkUserIdCard()
    if (flag1 && flag2 && flag3 && flag4) {
        let { data } = await request.post("user/regist", registUser)
        if (data.code == 200) {
            // 注册成功跳转 登录页
            alert("注册成功,快去登录吧")
            router.push("/login")
        } else {
            alert("抱歉,用户名被抢注了")
        }
    } else {
        alert("校验不通过,请求再次检查数据")
    }
}

function clearForm() {
    registUser.username = ""
    registUser.userPwd = ""
    usernameMsg.value = ""
    userPwdMsg.value = ""
    reUserPwd.value = ""
    reUserPwdMsg.value = ""
    registUser.userRole = "patient"
    registUser.userAddress = ""
    registUser.userPhone = ""
    registUser.userIdCard = ""
    registUser.userRealName = ""
    userIdCardMsg.value = ""

}


</script>

<template>
    <div>
        <h3 class="ht">请注册</h3>
        <h5 class="ht">注意!密码长度为6-16位,不包含特殊符号</h5>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <td>请输入账号</td>
                <td>
                    <input class="ipt" id="usernameInput" type="text" name="username" v-model="registUser.username"
                        @blur="checkUsername()">

                    <span id="usernameMsg" class="msg" v-text="usernameMsg"></span>
                </td>
            </tr>
            <tr class="ltr">
                <td>请输入密码</td>
                <td>
                    <input class="ipt" id="userPwdInput" type="password" name="userPwd" v-model="registUser.userPwd"
                        @blur="checkUserPwd()">
                    <span id="userPwdMsg" class="msg" v-text="userPwdMsg"></span>
                </td>
            </tr>
            <tr class="ltr">
                <td>确认密码</td>
                <td>
                    <input class="ipt" id="reUserPwdInput" type="password" v-model="reUserPwd" @blur="checkReUserPwd()">
                    <span id="reUserPwdMsg" class="msg" v-text="reUserPwdMsg"></span>
                </td>
            </tr>

            <tr class="ltr">
                <td>身份证号</td>
                <td>
                    <input class="ipt" id="usernameInput" type="text" name="username" v-model="registUser.userIdCard"
                        @blur="checkUserIdCard()">
                    <span id="usernameMsg" class="msg" v-text="userIdCardMsg"></span>
                </td>
            </tr>
            <tr class="ltr">
                <td>真实姓名</td>
                <td>
                    <input class="ipt" id="usernameInput" type="text" name="username" v-model="registUser.userRealName">
                </td>
            </tr>
            <tr class="ltr">
                <td>联系电话</td>
                <td>
                    <input class="ipt" id="usernameInput" type="text" name="username" v-model="registUser.userPhone">
                </td>
            </tr>
            <tr class="ltr">
                <td>住址</td>
                <td>
                    <input class="ipt" id="usernameInput" type="text" name="username" v-model="registUser.userAddress">
                </td>
            </tr>


            <tr>
                <td>您的身份</td>
                <td>
                    <input type="radio" name="userRole" v-model="registUser.userRole" value="admin">管理员
                    <input type="radio" name="userRole" v-model="registUser.userRole" value="doctor">医生
                    <input type="radio" name="userRole" v-model="registUser.userRole" value="patient">患者
                </td>
            </tr>
            <tr class="ltr">
                <td colspan="2" class="buttonContainer">
                    <input class="btn1" type="button" @click="regist()" value="注册">
                    <input class="btn1" type="button" @click="clearForm()" value="重置">
                    <router-link to="/login">
                        <button class="btn1">去登录</button>
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

.msg {
    color: gold;
}

.buttonContainer {
    text-align: center;
}
</style>
