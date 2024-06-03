<script setup>
import { ref, reactive } from 'vue'
/* 导入发送请求的axios对象 */
import request from '../utils/request'

import { defineUser } from '../store/userStore';
let sysUser = defineUser();


import { useRouter } from 'vue-router'
const router = useRouter()

let newPwd = reactive({
    userPwd: "",//密码
})

let userPwdMsg = ref('')
let reUserPwdMsg = ref('')
let reUserPwd = ref('')

async function checkUserPwd() {
    let userPwdReg = /^[a-zA-Z0-9]{6,16}$/
    if (!userPwdReg.test(newPwd.userPwd)) {
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
    if (newPwd.userPwd != reUserPwd.value) {
        reUserPwdMsg.value = "两次密码不一致"
        return false
    }
    reUserPwdMsg.value = "OK"
    return true
}

// 注册的方法
async function changePwd() {
    // 校验所有的输入框是否合法
    let flag2 = await checkUserPwd()
    let flag3 = await checkReUserPwd()
    if (flag2 && flag3) {

        //这里记得改一下发送的请求
        let { data } = await request.post("user/regist", { params: { newPwd: newPwd.userPwd, username: sysUser.username, uid: sysUser.uid } })
        if (data.code == 200) {
            // 注册成功跳转 登录页
            alert("修改成功,请重新登陆!")
            router.push("/login")
        } else {
            alert("抱歉,出错了")
        }
    } else {
        alert("校验不通过,请求再次检查数据")
    }
}

function clearForm() {
    newPwd.userPwd = ""
    userPwdMsg.value = ""
    reUserPwd.value = ""
    reUserPwdMsg.value = ""
}


</script>

<template>
    <div>
        <h3 class="ht">请修改密码</h3>
        <h5 class="ht">密码请设置为6-16位,不包含特殊符号</h5>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <td>输入新的密码</td>
                <td>
                    <input class="ipt" id="userPwdInput" type="password" name="userPwd" v-model="newPwd.userPwd"
                        @blur="checkUserPwd()">
                    <span id="userPwdMsg" class="msg" v-text="userPwdMsg"></span>
                </td>
            </tr>
            <tr class="ltr">
                <td>确认新的密码</td>
                <td>
                    <input class="ipt" id="reUserPwdInput" type="password" v-model="reUserPwd" @blur="checkReUserPwd()">
                    <span id="reUserPwdMsg" class="msg" v-text="reUserPwdMsg"></span>
                </td>
            </tr>
            <tr class="ltr">
                <td colspan="2" class="buttonContainer">
                    <input class="btn1" type="button" @click="changePwd()" value="修改">
                    <input class="btn1" type="button" @click="clearForm()" value="重置输入">
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
    width: 80px;
    background-color: antiquewhite;

}

.msg {
    color: gold;
}

.buttonContainer {
    text-align: center;
}
</style>
