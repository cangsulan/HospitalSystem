<script setup>
/* 导入pinia数据 */
import { defineUser } from '../store/userStore.js'
let sysUser = defineUser()

import { useRoute } from 'vue-router';
let route = useRoute()//用路由传参来接收index参数
let index = ref(route.query.index)
import { defineFindUser } from '../store/findUserStore.js';
let findUser = defineFindUser().itemList[index.value] //不确定这么做会不会有问题

import { ref, reactive, onUpdated, onMounted } from 'vue'
import request from '../utils/request'
import { useRouter } from 'vue-router'
const router = useRouter()


let usernameMsg = ref('')
let userPwdMsg = ref('')
let userIdCardMsg = ref('')

async function changeMsg() {
    let flag1 = await checkUsername()
    let flag2 = await checkUserPwd()
    let flag3 = await checkUserIdCard()
    if (flag1 && flag2 && flag3) {
        //根据用户身份 调用对应方法来修改信息！
        console.log(findUser)
        if (findUser.userRole == "patient") {
            let authorized = 0;
            if (findUser.userChecked == "已通过") {
                authorized = 1;
            } else if (findUser.userChecked == "待审核") {
                authorized = 0;
            }
            let { data } = await request.post("patient/update", {
                userId: findUser.uid,
                userName: findUser.username,
                password: findUser.userPwd,
                idNumber: findUser.idCard,
                name: findUser.realName,
                age: findUser.age,
                gender: findUser.gender,
                address: findUser.address,
                contact: findUser.phone,
                medicalRecord: findUser.medicalHistory,
                authorized: authorized,
                userRole: "patien",
            });
            if (data.code == 200) {
                alert("修改成功")
            } else {
                alert("修改失败")
            }

        } else if (findUser.userRole == "doctor") {
            let authorized = 0;
            if (findUser.userChecked == "已通过") {
                authorized = 1;
            } else if (findUser.userChecked == "待审核") {
                authorized = 0;
            }
            let { data } = await request.post("doctor/update", {
                userId: findUser.uid,
                userName: findUser.username,
                password: findUser.userPwd,
                idNumber: findUser.idCard,
                name: findUser.realName,
                age: findUser.age,
                gender: findUser.gender,
                address: findUser.address,
                contact: findUser.phone,
                hospital: findUser.hospital,
                department: findUser.office,
                title: findUser.title,
                specialty: findUser.speciality,
                authorized: authorized,
                userRole: "doctor",
            });
            if (data.code == 200) {
                alert("修改成功")
            } else {
                alert("修改失败")
            }

        } else if (findUser.userRole == "admin") {
            let { data } = await request.post("admin/update", {
                userId: findUser.uid,
                userName: findUser.username,
                password: findUser.userPwd,
                idNumber: findUser.idCard,
                name: findUser.realName,

                address: findUser.address,
                contact: findUser.phone,
                userRole: "admin",
            });
            if (data.code == 200) {
                alert("修改成功")
            } else {
                alert("修改失败")
            }

        }






    } else {
        alert("校验不通过,请求再次检查数据")
    }

}




async function checkUserIdCard() {
    let userIdCardReg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (!userIdCardReg.test(findUser.idCard)) {
        userIdCardMsg.value = "格式有误"
        return false
    }
    userIdCardMsg.value = "OK"
    return true
}

async function checkUsername() {
    let usernameReg = /^[a-zA-Z0-9]{5,10}$/
    if (!usernameReg.test(findUser.username)) {
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
    if (!userPwdReg.test(findUser.userPwd)) {
        userPwdMsg.value = "格式有误"
        return false
    }
    userPwdMsg.value = "OK"
    return true
}

function getback() {
    router.push("/findUser");
}
</script>

<template>
    <div>
        <h3 class="ht">用户信息</h3>
        <!-- 先显示出基本信息 -->
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <td>账号名</td>
                <td>
                    <input class="ipt" type="text" v-model="findUser.username" @blur="checkUsername()">
                    <span id="usernameMsg" class="msg" v-text="usernameMsg"></span>
                </td>
            </tr>
            <tr class="ltr">
                <td>密码</td>
                <td>
                    <input class="ipt" type="text" v-model="findUser.userPwd" @blur="checkUserPwd()">
                    <span id="userPwdMsg" class="msg" v-text="userPwdMsg"></span>
                </td>

            </tr>
            <tr class="ltr">
                <td>身份</td>
                <td>
                    {{ findUser.userRole }}
                </td>
            </tr>
            <tr class="ltr">
                <td>真实姓名</td>
                <td>
                    <input class="ipt" type="text" v-model="findUser.realName">
                </td>
            </tr>
            <tr class="ltr">
                <td>身份证号</td>
                <td>
                    <input class="ipt" type="text" v-model="findUser.idCard" @blur="checkUserIdCard()">
                    <span id="userPwdMsg" class="msg" v-text="userIdCardMsg"></span>
                </td>
            </tr>
            <tr class="ltr" v-if="findUser.userRole != 'admin'">
                <td>年龄</td>
                <td>
                    <input class="ipt" type="text" v-model="findUser.age">
                </td>
            </tr>
            <tr class="ltr" v-if="findUser.userRole != 'admin'">
                <td>性别</td>
                <td>
                    <input class="ipt" type="text" v-model="findUser.gender">
                </td>
            </tr>
            <tr class="ltr">
                <td>审核状态</td>
                <td>
                    <input type="radio" v-model="findUser.userChecked" value="已通过">已通过
                    <input type="radio" v-model="findUser.userChecked" value="待审核">待审核
                </td>
            </tr>
            <tr class="ltr">
                <td>地址</td>
                <td>
                    <input class="ipt" type="text" v-model="findUser.address">
                </td>
            </tr>
            <tr class="ltr">
                <td>联系电话</td>
                <td>
                    <input class="ipt" type="text" v-model="findUser.phone">
                </td>
            </tr>
            <tr class="ltr" v-if="findUser.userRole == 'patient'">
                <td>病历描述</td>
                <td>
                    <input class="ipt" type="text" v-model="findUser.medicalHistory">
                </td>
            </tr>
            <tr class="ltr" v-if="findUser.userRole == 'doctor'">
                <td>所属医院</td>
                <td>
                    <input class="ipt" type="text" v-model="findUser.hospital">
                </td>
            </tr>
            <tr class="ltr" v-if="findUser.userRole == 'doctor'">
                <td>科室</td>
                <td>
                    <input class="ipt" type="text" v-model="findUser.office">
                </td>
            </tr>
            <tr class="ltr" v-if="findUser.userRole == 'doctor'">
                <td>职称</td>
                <td>
                    <input class="ipt" type="text" v-model="findUser.title">
                </td>
            </tr>
            <tr class="ltr" v-if="findUser.userRole == 'doctor'">
                <td>专长</td>
                <td>
                    <input class="ipt" type="text" v-model="findUser.speciality">
                </td>
            </tr>



            <tr class="ltr">
                <td colspan="2" class="buttonContainer">
                    <input class="btn1" type="button" @click="changeMsg()" value="修改">
                    <input class="btn1" type="button" @click="getback()" value="返回">
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
    width: 800px;
    border: 5px solid cadetblue;
    margin: 0px auto;
    border-radius: 5px;
    font-family: 幼圆;
}

.tab2 {
    width: 832px;
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
    width: 86%;
}

.btn1 {
    border: 2px solid powderblue;
    border-radius: 4px;
    width: 80px;
    background-color: antiquewhite;
}

#usernameMsg,
#userPwdMsg {
    color: gold;
}

.buttonContainer {
    text-align: center;
}

#registration {
    border: 2px solid powderblue;
    border-radius: 4px;
    width: 100px;
    background-color: antiquewhite;

}
</style>
