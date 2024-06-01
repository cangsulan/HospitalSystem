<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import { defineUser } from '../store/userStore';
import { definePatient } from '../store/patientStore';
let sysUser = defineUser()
let sysPatient = definePatient()

import request from '../utils/request'
async function changeMsg() {
  let { data } = await request.post("/admin/changeMsg", sysPatient);
  if (data.code == 200) {
    alert("修改成功")
  } else {
    alert("修改失败")
  }
}
</script>

<template>
  <div>
    <h3 class="ht">病人信息</h3>
    <!-- 先显示出病人的基本信息 -->
    <table class="tab" cellspacing="0px">
      <tr class="ltr">
        <td>身份证号</td>
        <td>
          <input class="ipt" type="text" v-model="sysPatient.idCard">
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
  width: 80%;
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
