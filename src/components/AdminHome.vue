<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import { defineUser } from '../store/userStore';
import { defineAdmin } from '../store/adminStore';
let sysUser = defineUser()
let sysAdmin = defineAdmin()

import request from '../utils/request'

async function changeMsg() {
  let { data } = await request.post("/admin/changeMsg", sysAdmin);
  if (data.code == 200) {
    alert("修改成功")
  } else {
    alert("修改失败")
  }
}
</script>

<template>
  <div>
    <h3 class="ht">管理员信息</h3>
    <!-- 先显示出病人的基本信息 -->
    <table class="tab" cellspacing="0px">
      <tr class="ltr">
        <td>身份证号</td>
        <td>
          <input class="ipt" type="text" v-model="sysAdmin.idCard">
        </td>
      </tr>
      <tr class="ltr">
        <td>真实姓名</td>
        <td>
          <input class="ipt" type="text" v-model="sysAdmin.realName">
        </td>
      </tr>
      <tr class="ltr">
        <td>住址</td>
        <td>
          <input class="ipt" type="text" v-model="sysAdmin.address">
        </td>
      </tr>
      <tr class="ltr">
        <td>联系方式</td>
        <td>
          <input class="ipt" type="text" v-model="sysAdmin.phone">
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
      <h3 class="ht">管理员可供操作</h3>
      <table class="tab" cellspacing="0px">
        <tr class="ltr">
          <td>操作1</td>
          <td colspan="2" class="buttonContainer">
            <router-link to="/checkRegist">
              <button id="registration">审核注册申请</button>
            </router-link>
          </td>
        </tr>
        <tr class="ltr">
          <td>操作2</td>
          <td colspan="2" class="buttonContainer">
            <router-link to="/checkSchedule">
              <button id="registration">审核出诊申请</button>
            </router-link>
          </td>
        </tr>
        <tr class="ltr">
          <td>操作3</td>
          <td colspan="2" class="buttonContainer">
            <router-link to="/findUser">
              <button id="registration">查询或修改<br>系统用户信息</button>
            </router-link>
          </td>
        </tr>
      </table>
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
  height: 50px;
  width: 100px;
  background-color: antiquewhite;

}
</style>
