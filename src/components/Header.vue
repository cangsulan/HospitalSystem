<script setup>
/* 导入pinia数据 */
import { defineUser } from "../store/userStore.js"
import { defineSchedule } from "../store/scheduleStore.js"
import { definePatient } from '../store/patientStore';
import { defineDocter } from '../store/docterStore.js';
import { defineAdmin } from '../store/adminStore.js';
import { definePatientSchedule } from '../store/patientScheduleStore'
import { defineUserList } from "../store/userListStore.js";

let sysUser = defineUser()
let schedule = defineSchedule()
let sysPatient = definePatient()
let sysDocter = defineDocter()
let sysAdmin = defineAdmin()
let patientSchedule = definePatientSchedule()
let userList = defineUserList()

import { useRouter } from 'vue-router'
let router = useRouter()

function goHome() {
  if (sysUser.userRole == "patient") {
    router.push("/patienthome");
  } else if (sysUser.userRole == "doctor") {
    router.push("/docterhome");
  } else if (sysUser.userRole == "admin") {
    if (sysUser.username == "admin" && sysUser.userPwd == "admin") {
      router.push("/changePwd");
    } else {
      router.push("/adminhome");
    }
  }
}

function logout() {
  // 清除所有pinia数据
  sysUser.$reset()
  sysAdmin.$reset()
  sysPatient.$reset()
  sysDocter.$reset()
  schedule.$reset()
  patientSchedule.$reset()
  userList.$reset()
  // 跳转到登录页
  router.push("/login")
}

</script>

<template>
  <div>
    <h1 class="ht">欢迎使用医院挂号系统</h1>
    <div>
      <div class="optionDiv" v-if="sysUser.username == ''">
        <router-link to="/login">
          <button class="b1s">登录</button>
        </router-link>
        <router-link to="/regist">
          <button class="b1s">注册</button>
        </router-link>
      </div>


      <div class="optionDiv" v-else>
        欢迎 {{ sysUser.username }}
        <router-link to="/changePwd">
          <button class="b1b">修改账户密码</button>
        </router-link>
        <button class="b1b" @click="goHome()">用户主页</button>
        <button class="b1b" @click="logout()">退出登录</button>
      </div>

      <br>
    </div>
  </div>
</template>

<style scoped>
.ht {
  text-align: center;
  color: cadetblue;
  font-family: 幼圆;
}

.b1s {
  border: 2px solid powderblue;
  border-radius: 4px;
  width: 60px;
  background-color: antiquewhite;

}

.b1b {
  border: 2px solid powderblue;
  border-radius: 4px;
  width: 100px;
  background-color: antiquewhite;
}

.optionDiv {
  width: 500px;
  float: right;
}
</style>
