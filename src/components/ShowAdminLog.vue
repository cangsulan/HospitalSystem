<script setup>
//该界面用来展示从后端找到的管理员操作记录，
//包括 管理员删除的记录，和管理员修改记录，主要针对管理员修改用户信息那块

/* 导入pinia数据 */
import { defineUser } from '../store/userStore.js'
let sysUser = defineUser()
import { defineAdminLog } from '../store/adminLogStore.js';
let logList = defineAdminLog()

let pageSize = 6;

import { ref, reactive, onUpdated, onMounted } from 'vue'
import request from '../utils/request'
import { useRouter } from 'vue-router'
const router = useRouter()


let logLength = logList.itemList.length;
let logIndex = ref(0)
let log = reactive({
    itemList: [],
})
let nextIndex = ref(logIndex.value + pageSize);
log.itemList = logList.itemList.slice(logIndex.value, nextIndex.value);



onMounted(async () => {
    showLogs()
})

async function showLogs() {
    //首页，前10条
    let { data } = await request.get("log/getAll");

    logList.itemList = [];
    logList.itemList = data.data;
    for (let index in data.data) {
        //把json字符串转为js的json对象
        logList.itemList[index].originalValue = (eval('(' + data.data[index].originalValue + ')'));
    }


    if (logList.itemList.length < pageSize) {
        nextIndex.value = logList.itemList.length;
    }
    log.itemList = logList.itemList.slice(logIndex.value, nextIndex.value);
}

async function showFirstLogs() {
    //跳转到首页
    logIndex.value = 0;
    nextIndex.value = logIndex.value + pageSize;
    if (nextIndex.value > logList.itemList.length) {
        nextIndex.value = logList.itemList.length;
    }
    log.itemList = logList.itemList.slice(logIndex.value, nextIndex.value);
}


async function showPreLogs() {
    //上一页
    logIndex.value = logIndex.value - pageSize;
    nextIndex.value = logIndex.value + pageSize;
    if (logIndex.value < 0) {
        logIndex.value = 0;
        nextIndex.value = logIndex.value + pageSize;
    }
    if (nextIndex.value > logList.itemList.length) {
        nextIndex.value = logList.itemList.length;
    }
    log.itemList = logList.itemList.slice(logIndex.value, nextIndex.value);
    console.log(log.itemList)
}

async function showNextLogs() {
    //下一页，如果到底了的话
    if (nextIndex.value >= logList.itemList.length) {
        alert("已经到底了~")
        return;
    }
    logIndex.value = logIndex.value + pageSize;
    nextIndex.value = logIndex.value + pageSize;
    if (logIndex.value < 0) {
        logIndex.value = 0;
        nextIndex.value = logIndex.value + pageSize;
    }
    if (nextIndex.value > logList.itemList.length) {
        nextIndex.value = logList.itemList.length;
    }
    log.itemList = logList.itemList.slice(logIndex.value, nextIndex.value);
    console.log(logIndex.value, nextIndex.value, logList.itemList.length)
}

async function showLastLogs() {
    //跳转到尾页
    logIndex.value = parseInt(logList.itemList.length / pageSize) * pageSize;
    nextIndex.value = logIndex.value + pageSize;
    if (nextIndex.value > logList.itemList.length) {
        nextIndex.value = logList.itemList.length;
    }
    log.itemList = logList.itemList.slice(logIndex.value, nextIndex.value);
}
</script>

<template>
    <div>
        <h3 class="ht">管理员操作记录如下</h3>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <th style="width: 80px">序号</th>
                <th>log描述:</th>
            </tr>
            <tr class="ltr" v-for="(item, index) in log.itemList" :key="index">
                <td style="text-align: center">{{ log.itemList[index].id }}</td>
                <td>
                    管理员 {{ item.adminId }} 号 更改了 <span style="color: red;">{{ item.userRole }} 用户 {{ item.userId }}
                        号</span> 的信息,
                    <br><span style="color: red;">修改时间为: {{ item.modifyTime }} ,修改类型为{{ item.operationType }}</span>
                    ,该用户信息 原来 为：
                    <div class="grid-container">
                        <span class="grid-item field-1">uid: {{ item.originalValue.uid }}</span>
                        <span class="grid-item field-2">userRole: {{ item.originalValue.userRole }}</span>

                        <span class="grid-item field-1">userChecked: {{ item.originalValue.userChecked }}</span>
                        <span class="grid-item field-2">username: {{ item.originalValue.username }}</span>

                        <span class="grid-item field-1">realName: {{ item.originalValue.realName }}</span>
                        <span class="grid-item field-2">idCard: {{ item.originalValue.idCard }}</span>

                        <span class="grid-item field-1">age: {{ item.originalValue.age }}</span>
                        <span class="grid-item field-1">gender: {{ item.originalValue.gender }}</span>
                        <span class="grid-item field-2">address: {{ item.originalValue.address }}</span>


                        <span class="grid-item field-1">title: {{ item.originalValue.title }}</span>
                        <span class="grid-item field-1">office: {{ item.originalValue.office }}</span>
                        <span class="grid-item field-2">hospital: {{ item.originalValue.hospital }}</span>

                        <span class="grid-item field-2">phone: {{ item.originalValue.phone }}</span>
                        <span class="grid-item field-2">speciality: {{ item.originalValue.speciality }}</span>

                    </div>
                    <br><span class="grid-item field-2">medicalHistory: {{ item.originalValue.medicalHistory }}</span>
                </td>
            </tr>
        </table>
        <br />
        <div style="text-align: center">
            <button @click="showFirstLogs()">首页</button>
            <button style="margin-right: 20px; margin-left: 20px" @click="showPreLogs()">上一页</button>
            <button style="margin-right: 20px; margin-left: 20px" @click="showNextLogs()">下一页</button>
            <button @click="showLastLogs()">尾页</button>
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
    width: 90%;
    border: 5px solid cadetblue;
    margin: 0px auto;
    border-radius: 5px;
    font-family: 幼圆;
}

.ltr td {
    border: 2px solid powderblue;
    text-align: left;
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

.grid-container {
    display: grid;
    grid-template-columns: 20% 30% 50%;
    /* 两列布局 */
    gap: 10px;
    /* 每个字段之间的间隔 */
    width: 99%;
}

.grid-item {
    padding: 4px;
    border: 0px solid #000;
    height: 4px;
    /* 可选：添加边框以查看效果 */
}

.field-1 {
    text-align: left;
    /* 第一列左对齐 */
}

.field-2 {
    text-align: left;
    /* 第二列左对齐 */
}
</style>
