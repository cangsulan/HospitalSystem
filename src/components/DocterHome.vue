<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import { defineUser } from '../store/userStore';
import { defineDocter } from '../store/docterStore';
let sysUser = defineUser()
let sysDocter = defineDocter()

import request from '../utils/request'
async function changeMsg() {
  let { data } = await request.post("/admin/changeMsg", sysDocter);
  if (data.code == 200) {
    alert("修改成功")
  } else {
    alert("修改失败")
  }
}
</script>

<template>
  <div>
    <h3 class="ht">医生信息</h3>
    <!-- 先显示出基本信息 -->
    <table class="tab" cellspacing="0px">
      <tr class="ltr">
        <td>身份证号</td>
        <td>
          <input class="ipt" type="text" v-model="sysDocter.idCard">
        </td>
      </tr>
      <tr class="ltr">
        <td>真实姓名</td>
        <td>
          <input class="ipt" type="text" v-model="sysDocter.realName">
        </td>
      </tr>
      <tr class="ltr">
        <td>年龄</td>
        <td>
          <input class="ipt" type="text" v-model="sysDocter.age">
        </td>
      </tr>
      <tr class="ltr">
        <td>性别</td>
        <td>
          <input class="ipt" type="text" v-model="sysDocter.gender">
        </td>
      </tr>
      <tr class="ltr">
        <td>住址</td>
        <td>
          <input class="ipt" type="text" v-model="sysDocter.address">
        </td>
      </tr>
      <tr class="ltr">
        <td>联系方式</td>
        <td>
          <input class="ipt" type="text" v-model="sysDocter.phone">
        </td>
      </tr>
      <tr class="ltr">
        <td>所属医院</td>
        <td>
          <input class="ipt" type="text" v-model="sysDocter.hospital">
        </td>
      </tr>
      <tr class="ltr">
        <td>科室</td>
        <td>
          <input class="ipt" type="text" v-model="sysDocter.office">
        </td>
      </tr>
      <tr class="ltr">
        <td>职称</td>
        <td>
          <input class="ipt" type="text" v-model="sysDocter.title">
        </td>
      </tr>
      <tr class="ltr">
        <td>专长</td>
        <td>
          <input class="ipt" type="text" v-model="sysDocter.speciality">
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
      <h2 class="ht">出诊专区</h2>
      <router-link to="/showSchedule">
        <button id="registration">发布出诊信息</button>
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
