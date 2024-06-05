<script setup>
//该界面用来展示从后端找到的管理员操作记录，
//包括 管理员删除的记录，和管理员修改记录，主要针对管理员修改用户信息那块

/* 导入pinia数据 */
import { defineUser } from '../store/userStore.js'
let sysUser = defineUser()
import { defineAdminLog } from '../store/adminLogStore.js';
let logList = defineAdminLog()

let pageSize = 10;

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
    let { data } = await request.get("schedule/findAllSchedule", { params: { "index": 0 } })
    logList.itemList = data.data.itemList;
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
    logIndex.value = logIndex.value + 10;
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

</script>

<template>
    <div>
        <h3 class="ht">管理员操作记录如下</h3>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <th style="width: 60px;">序号</th>
                <th> log描述:</th>
            </tr>
            <tr class="ltr" v-for="item, index in log.itemList" :key="index">
                <td style="text-align: center;">{{ log.itemList[index].id }}</td>
                <td>
                    {{ log.itemList[index].log }}
                </td>
            </tr>
        </table>
        <br>
        <div style="text-align: center;">
            <button @click="showFirstLogs()">首页</button>
            <button style="margin-right: 20px;margin-left:20px;" @click="showPreLogs()">上一页</button>
            <button @click="showNextLogs()">下一页</button>
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
</style>
