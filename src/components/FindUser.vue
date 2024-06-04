<script setup>
/* 导入pinia数据 */
import { defineUser } from '../store/userStore.js'
let sysUser = defineUser()
import { defineFindUser } from '../store/findUserStore.js';
let findUser = defineFindUser();

import { ref, reactive, onUpdated, onMounted } from 'vue'
import request from '../utils/request'
import { useRouter } from 'vue-router'
const router = useRouter()

//要用路由传参来传index

let option = ref(1)
let input = reactive({
    username: "",
    idCard: "",
    realName: "",
})

let canShow = ref(true)

async function findUser1() {
    //每次find前,要先清空userList
    findUser.$reset();
    //根据input.username
    let { data } = await request.post("schedule/findAllSchedule", { username: input.username })
    findUser.itemList = data.data.itemList

}
async function findUser2() {
    findUser.$reset();
    //根据input.realName
    let { data } = await request.post("schedule/findAllSchedule", { realName: input.realName })
    findUser.itemList = data.data.itemList
}
async function findUser3() {
    findUser.$reset();
    //根据input.idCard
    let { data } = await request.post("schedule/findAllSchedule", { idCard: input.idCard })
    findUser.itemList = data.data.itemList
}

async function changeUser(index) {
    //然后，路由到changeUser
    router.push({ path: "/changeUser", query: { index: index } });
}

async function removeUser(index) {
    //告诉后端要删除这个用户账号
    let { data } = await request.post("schedule/findAllSchedule", { uid: findUser.itemList[index].uid, username: findUser.itemList[index].username })
    if (data.code == 200) {
        alert("修改成功")
    } else {
        alert("修改失败")
    }
    //然后刷新页面
    location.reload();
}

</script>

<template>
    <div>
        <h3 class="ht">查询系统用户</h3>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <td>选择查询方式</td>
                <td>
                    <input type="radio" name="option" value="1" v-model="option">账号名
                    <input type="radio" name="option" value="2" v-model="option">真实姓名
                    <input type="radio" name="option" value="3" v-model="option">身份证号
                </td>
            </tr>
            <tr class="ltr" v-if="option == 1">
                <td>输入账号名</td>
                <td>
                    <input type="text" class="ipt" v-model="input.username" />
                </td>
                <td class="buttonContainer">
                    <button class="btn1" @click="findUser1()">查询</button>
                </td>
            </tr>
            <tr class="ltr" v-if="option == 2">
                <td>输入姓名</td>
                <td>
                    <input type="text" class="ipt" v-model="input.realName" />
                </td>
                <td class="buttonContainer">
                    <button class="btn1" @click="findUser2()">查询</button>
                </td>
            </tr>
            <tr class="ltr" v-if="option == 3">
                <td>输入身份证号</td>
                <td>
                    <input type="text" class="ipt" v-model="input.idCard" />
                </td>
                <td class="buttonContainer">
                    <button class="btn1" @click="findUser3()">查询</button>
                </td>
            </tr>
        </table>
    </div>
    <div v-if="canShow">
        <br>
        <hr>
        <h3 class="ht">查询结果</h3>
        <table class="tab2" cellspacing="0px">
            <tr class="ltr">
                <th>账号名</th>
                <th>身份</th>
                <th>真实姓名</th>
                <th>身份证号</th>
                <th>住址</th>
                <th>联系电话</th>
                <th>操作</th>
            </tr>
            <tr class="ltr" v-for="item, index in findUser.itemList" :key="index">
                <td>{{ item.username }}</td>
                <td>{{ item.userRole }}</td>
                <td>{{ item.realName }}</td>
                <td>{{ item.idCard }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.phone }}</td>
                <td class="buttonContainer">
                    <button class="btn1" @click="changeUser(index)">修改<br>详细信息</button>
                    <button class="btn1" @click="removeUser(index)">删除<br>用户账号</button>
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
    width: 600px;
    border: 5px solid cadetblue;
    margin: 0px auto;
    border-radius: 5px;
    font-family: 幼圆;
}

.tab2 {
    width: 860px;
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
    width: 99%;
}

.btn1 {
    border: 2px solid powderblue;
    border-radius: 4px;
    width: 70px;
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
