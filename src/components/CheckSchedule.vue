<script setup>
/* 导入pinia数据 */
import { defineUser } from '../store/userStore.js'
let sysUser = defineUser()
import { defineSchedule } from '../store/scheduleStore.js';
let schedule = defineSchedule()

import { ref, reactive, onUpdated, onMounted } from 'vue'
import request from '../utils/request'

//挂载完毕后,立刻查询当前用户的所有日程信息,赋值给pinia
onMounted(async () => {
    showSchedule()
})
// 查询当前用户所有日程信息 并展示到视图的方法
async function showSchedule() {
    // 发送异步请求,获得所有待审核的所有日程记录
    let { data } = await request.get("schedule/findAllSchedule")
    schedule.itemList = data.data.itemList
}

async function agree(index) {
    let { data } = await request.post("schedule/updateSchedule", schedule.itemList[index])
    if (data.code == 200) {
        alert("操作成功")
        //刷新界面
        location.reload();
    } else {
        alert("操作失败");
        location.reload();
    }
}

async function disagree(index) {
    let { data } = await request.post("schedule/updateSchedule", schedule.itemList[index])
    if (data.code == 200) {
        alert("操作成功")
        //刷新界面
        location.reload();
    } else {
        alert("操作失败");
        location.reload();
    }
}




</script>

<template>
    <div>
        <h3 class="ht">待审核出诊申请如下</h3>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <th>医生</th>
                <th>职称</th>
                <th>科室</th>
                <th>所属医院</th>
                <th>联系电话</th>
                <th>挂号量</th>
                <th>时间</th>
                <th>审核操作</th>
            </tr>
            <tr class="ltr" v-for="item, index in schedule.itemList" :key="index">
                <td>{{ item.docterName }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.office }}</td>
                <td>{{ item.hospital }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.count }}</td>
                <td>{{ item.year }}-{{ item.month }}-{{ item.day }} {{ item.time }}</td>
                <td class="buttonContainer">
                    <button class="btn1" @click="agree(index)">通过</button>
                    <button class="btn1" @click="disagree(index)">否决</button>
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
    width: 90%;
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
</style>
