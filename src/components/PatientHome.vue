<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import { defineUser } from '../store/userStore';
import { definePatient } from '../store/patientStore';
let sysUser = defineUser()
let sysPatient = definePatient()

import request from '../utils/request'
import { ref } from 'vue'


async function changeMsg() {
  let flag1 = await checkUserIdCard()
  if (flag1) {
    let { data } = await request.post("/admin/changeMsg", {
      uid: sysUser.uid,
      username: sysUser.username,
      userRole: sysUser.userRole,
      idCard: sysPatient.idCard,
      realName: sysPatient.realName,
      age: sysPatient.age,
      gender: sysPatient.gender,
      address: sysPatient.address,
      phone: sysPatient.phone,
      medicalHistory: sysPatient.medicalHistory,

    });
    if (data.code == 200) {
      alert("修改成功")
    } else {
      alert("修改失败")
    }
    location.reload()
  } else {
    alert("校验不通过,请求再次检查数据")
  }
}

let userIdCardMsg = ref('')

async function checkUserIdCard() {
  let userIdCardReg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  if (!userIdCardReg.test(sysPatient.idCard)) {
    userIdCardMsg.value = "格式有误"
    return false
  }
  userIdCardMsg.value = "OK"
  return true
}

</script>

<template>
  <div>
    <h3 class="ht">患者信息</h3>
    <!-- 先显示出病人的基本信息 -->
    <table class="tab" cellspacing="0px">
      <tr class="ltr">
        <td>身份证号</td>
        <td>
          <input class="ipt" type="text" v-model="sysPatient.idCard" @blur="checkUserIdCard()">
          <span id="userPwdMsg" class="msg" v-text="userIdCardMsg"></span>
        </td>
      </tr>
      <tr class="ltr">
        <td>真实姓名</td>
        <td>
          <input class="ipt" type="text" v-model="sysPatient.realName">
        </td>
      </tr>
      <tr class="ltr">
        <td>年龄</td>
        <td>
          <input class="ipt" type="text" v-model="sysPatient.age">
        </td>
      </tr>
      <tr class="ltr">
        <td>性别</td>
        <td>
          <input class="ipt" type="text" v-model="sysPatient.gender">
        </td>
      </tr>
      <tr class="ltr">
        <td>住址</td>
        <td>
          <input class="ipt" type="text" v-model="sysPatient.address">
        </td>
      </tr>
      <tr class="ltr">
        <td>联系方式</td>
        <td>
          <input class="ipt" type="text" v-model="sysPatient.phone">
        </td>
      </tr>
      <tr class="ltr">
        <td>病历描述</td>
        <td>
          <input class="ipt" type="text" v-model="sysPatient.medicalHistory">
        </td>
      </tr>
      <tr class="ltr">
        <td colspan="2" class="buttonContainer">
          <input class="btn1" type="button" @click="changeMsg()" value="修改">
        </td>
      </tr>
    </table>
    <br>
    <hr>
    <div style="text-align: center;">
      <h2 class="ht">挂号专区</h2>
      <router-link to="/registration">
        <button id="registration">我要挂号</button>
      </router-link>
    </div>
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
  width: 70%;
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

#registration {
  border: 2px solid powderblue;
  border-radius: 4px;
  width: 100px;
  background-color: antiquewhite;

}
</style>
