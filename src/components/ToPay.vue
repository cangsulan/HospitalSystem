<script setup>
import { ref, reactive, onMounted } from 'vue'
/* 导入发送请求的axios对象 */
import request from '../utils/request'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

import { defineUser } from '../store/userStore';
import { definePatient } from '../store/patientStore';
let sysUser = defineUser()
let sysPatient = definePatient()

import { defineSchedule } from '../store/scheduleStore';
import { definePatientSchedule } from '../store/patientScheduleStore';
import { id } from 'element-plus/es/locales.mjs';
let schedule = defineSchedule()
let patientSchedule = definePatientSchedule()

//获取路由传参，当前的route对象
let route = useRoute()
let index = ref(route.query.index)//注意ref式数据,写js时要加上.value
let item = reactive({
    docterName: schedule.itemList[index.value].docterName,
    title: schedule.itemList[index.value].title,
    hospital: schedule.itemList[index.value].hospital,
    office: schedule.itemList[index.value].office,
    phone: schedule.itemList[index.value].phone,
    year: schedule.itemList[index.value].year,
    month: schedule.itemList[index.value].month,
    day: schedule.itemList[index.value].day,
    time: schedule.itemList[index.value].time,
    date: schedule.itemList[index.value].date,
})
async function toApply() {
    let { data } = await request.get(`registration/pay/${schedule.itemList[index.value].id}`)
    if (data.code == 200) {
        alert("支付成功！");
    } else if (data.code == 410) {
        alert("您已经支付过了，请勿重复支付")
    } else {
        alert("哦豁。。出错了！");
    }
    router.push("/registration");
}


//刷新当前网页
function refresh() {
    location.reload()
}
</script>

<template>
    <div>
        <h2 class="ht">支付中心</h2>
        <h4 class="ht">您所选择的挂号信息如下，确认无误后，请支付</h4>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <th>医生姓名</th>
                <th>职称</th>
                <th>所属医院</th>
                <th>科室</th>
                <th>联系电话</th>
                <th>就诊时间</th>
            </tr>
            <tr class="ltr">
                <td>{{ item.docterName }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.hospital }}</td>
                <td>{{ item.office }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.date + " " + item.time }}</td>
            </tr>
        </table>
        <br>
        <div class="ht">
            <button class="btn1" @click="toApply()">确认支付</button>
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
