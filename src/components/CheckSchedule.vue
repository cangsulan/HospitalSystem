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


async function agree(index) {
    //let { data } = await
    request.post(`admin/check/registration/${schedule.itemList[showIndex.value + index].id}`);
    // if (data.code == 200) {
    //     alert("操作成功！")
    // } else {
    //     alert("操作失败！")
    // }
    alert("操作成功！")
    showSchedule();
    showSchedule();
    showSchedule();
}

async function disagree(index) {
    let { data } = await request.post("schedule/updateSchedule", {
        id: schedule.itemList[index].id,
        flag: true,

    })
    if (data.code == 200) {
        alert("操作成功")
        //刷新界面
        location.reload();
    } else {
        alert("操作失败");
        location.reload();
    }
}



//要加一个分页的功能
let showIndex = ref(0)
let showItem = reactive({
    itemList: [],
})
let pageSize = 15;
let nextIndex = ref(showIndex.value + pageSize);
showItem.itemList = schedule.itemList.slice(showIndex.value, nextIndex.value);

async function showFirstPage() {
    //跳转到分页的首页
    showIndex.value = 0;
    nextIndex.value = showIndex.value + pageSize;
    if (nextIndex.value > schedule.itemList.length) {
        nextIndex.value = schedule.itemList.length;
    }
    showItem.itemList = schedule.itemList.slice(showIndex.value, nextIndex.value);
}

async function showPrePage() {
    //上一页
    showIndex.value = showIndex.value - pageSize;
    nextIndex.value = showIndex.value + pageSize;
    if (showIndex.value < 0) {
        showIndex.value = 0;
        nextIndex.value = showIndex.value + pageSize;
    }
    if (nextIndex.value > schedule.itemList.length) {
        nextIndex.value = schedule.itemList.length;
    }
    showItem.itemList = schedule.itemList.slice(showIndex.value, nextIndex.value);
}

async function showNextPage() {
    //下一页
    if (nextIndex.value >= schedule.itemList.length) {
        alert("已经到底了~")
        return;
    }
    showIndex.value = showIndex.value + pageSize;
    nextIndex.value = nextIndex.value + pageSize;
    if (showIndex.value < 0) {
        showIndex.value = 0;
        nextIndex.value = showIndex.value + pageSize;
    }
    if (nextIndex.value > schedule.itemList.length) {
        nextIndex.value = schedule.itemList.length;
    }
    showItem.itemList = schedule.itemList.slice(showIndex.value, nextIndex.value);
}


// 查询当前用户所有日程信息 并展示到视图的方法
async function showSchedule() {
    // 发送异步请求,获得所有待审核的所有日程记录
    let { data } = await request.get("admin/getRegistration");
    schedule.itemList = [];

    for (let index in data.data) {
        let geted = new Object()
        geted.id = data.data[index].id;
        geted.docterName = data.data[index].doctorName;
        geted.uid = data.data[index].uid;
        geted.phone = data.data[index].phone;
        geted.date = data.data[index].date;
        geted.count = data.data[index].count;
        geted.hospital = data.data[index].hospital;
        geted.title = data.data[index].title;
        geted.availableCount = data.data[index].availableCount;
        geted.office = data.data[index].office;
        if (data.data[index].time == 0) {
            geted.time = "上午"
        } else if (data.data[index].time == 1) {
            geted.time = "下午"
        }
        if (data.data[index].checked == 0) {
            geted.checked = "待审核"
        } else {
            geted.checked = "已通过"
        }
        schedule.itemList.push(geted);
    }

    if (schedule.itemList.length < pageSize) {
        nextIndex.value = schedule.itemList.length;
    }
    showItem.itemList = schedule.itemList.slice(showIndex.value, nextIndex.value);

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
            <tr class="ltr" v-for="item, index in showItem.itemList" :key="index">
                <td v-if="item.checked == '待审核'">{{ item.docterName }}</td>
                <td v-if="item.checked == '待审核'">{{ item.title }}</td>
                <td v-if="item.checked == '待审核'">{{ item.office }}</td>
                <td v-if="item.checked == '待审核'">{{ item.hospital }}</td>
                <td v-if="item.checked == '待审核'">{{ item.phone }}</td>
                <td v-if="item.checked == '待审核'">{{ item.count }}</td>
                <td v-if="item.checked == '待审核'">{{ item.date + " " + item.time }}</td>
                <td class="buttonContainer" v-if="item.checked == '待审核'">
                    <button class="btn1" @click="agree(index)">通过</button>
                    <!-- <button class="btn1" @click="disagree(index)">否决</button> -->
                </td>
            </tr>
        </table>
        <br>
        <div style="text-align: center;">
            <button @click="showFirstPage()">首页</button>
            <button style="margin-right: 20px;margin-left:20px;" @click="showPrePage()">上一页</button>
            <button @click="showNextPage()">下一页</button>
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
