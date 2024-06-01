<script setup>
import { ref, reactive, onMounted } from 'vue'
/* 导入发送请求的axios对象 */
import request from '../utils/request'

import { useRouter } from 'vue-router'
const router = useRouter()

import { defineUser } from '../store/userStore';
import { definePatient } from '../store/patientStore';
let sysUser = defineUser()
let sysPatient = definePatient()

import { defineSchedule } from '../store/scheduleStore';
import { definePatientSchedule } from '../store/patientScheduleStore';
let schedule = defineSchedule()
let patientSchedule = definePatientSchedule()

onMounted(async () => {
    showPatientSchedule()
    showSchedule()
})

async function showPatientSchedule() {
    // let { data } = await request.get("schedule/findPatientSchedule", { params: { uid: sysUser.uid } })
    // patientSchedule.itemList = data.data.itemList
}

async function showSchedule() {
    console.log(schedule.itemList[0])
    // let { data } = await request.get("schedule/findAllSchedule")
    // schedule.itemList = data.data.itemList
}

async function toApply(index) {
    let { data } = await request.get("registration/apply", schedule.itemList[index])
    if (data.code == 200) {
        alert("挂号成功！");
    } else {
        alert("挂号失败......");
    }
    refresh();
}


//刷新当前网页
function refresh() {
    location.reload()
}
</script>

<template>
    <div>
        <div style="text-align: center;">
            <h7 class="ht">要挂号请及时刷新信息，来得到最新信息</h7>
            <button class="btn1" @click="refresh()">刷新页面</button>
        </div>
        <hr>
        <h3 class="ht">您当前已挂号的信息如下</h3>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <th>医生姓名</th>
                <th>职称</th>
                <th>所属医院</th>
                <th>科室</th>
                <th>联系电话</th>
                <th>就诊时间</th>
            </tr>
            <tr class="ltr" v-for="item, index in patientSchedule.itemList" :key="index">
                <td>{{ item.docterName }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.hospital }}</td>
                <td>{{ item.office }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.year }}-{{ item.month }}-{{ item.day }} {{ item.time }}</td>
            </tr>
        </table>
        <h6 class="ht">温馨提示：请您注意就诊时间,不要错过了哦~</h6>
        <hr>
        <h3 class="ht">可供挂号名额信息如下</h3>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <th>医生姓名</th>
                <th>职称</th>
                <th>所属医院</th>
                <th>科室</th>
                <th>联系电话</th>
                <th>出诊时间</th>
                <th>剩余名额</th>
                <th>操作</th>
            </tr>
            <tr class="ltr" v-for="item, index in schedule.itemList" :key="index">
                <td>{{ item.docterName }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.hospital }}</td>
                <td>{{ item.office }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.year }}-{{ item.month }}-{{ item.day }} {{ item.time }}</td>
                <td>{{ item.availableCount }}</td>
                <td class="buttonContainer">
                    <button class="btn1" @click="toApply(index)">挂号</button>
                </td>
            </tr>
        </table>
        <br>
        <hr>
    </div>
</template>
<style scoped>
.ht {
    text-align: center;
    color: cadetblue;
    font-family: 幼圆;
}

.tab {
    width: 80%;
    border: 5px solid cadetblue;
    margin: 0px auto;
    border-radius: 5px;
    font-family: 幼圆;
}

.ltr td {
    border: 1px solid powderblue;
    text-align: center;
}

.ltr td input {
    width: 30px;
}

.ipt {
    border: 0px;
    width: 50%;

}

.btn1 {
    border: 2px solid powderblue;
    border-radius: 4px;
    width: 100px;
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
