<script setup>
/* 导入pinia数据 */
import { defineUser } from '../store/userStore.js'
import { defineSchedule } from '../store/scheduleStore.js'
let sysUser = defineUser()
let schedule = defineSchedule()

import { ref, reactive, onUpdated, onMounted } from 'vue'
import request from '../utils/request'
import { useRouter } from 'vue-router';
let router = useRouter();
//挂载完毕后,立刻查询当前用户的所有日程信息,赋值给pinia
onMounted(async () => {
    showSchedule()
})

router.beforeEach((to, from, next) => {
    if (to.name == "/showSchedule") {
        showSchedule()
    }
    next();
})

function scheduleClass(uid, docterName, phone, year, month, day, time, count, id, checked, availableCount, hospital, title, office, date) {
    this.uid = uid;
    this.docterName = docterName;
    this.phone = phone;
    this.year = year;
    this.month = month;
    this.day = day;
    this.time = time;
    this.count = count;
    this.id = id;
    this.checked = checked;
    this.availableCount = availableCount;
    this.hospital = hospital;
    this.title = title;
    this.office = office;
    this.date = date;

}

// 查询当前用户所有日程信息 并展示到视图的方法
async function showSchedule() {
    // 发送异步请求,获得当前用户的所有日程记录
    let { data } = await request.get("registration/getAll");
    if (data.code == 200) {
        schedule.itemList = [];
        data.data.forEach((item, index, array) => {
            let geted = new scheduleClass();
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
        })
        //console.log(schedule.itemList)
    } else {

    }
}

async function addItem() {
    //改成了跳转到新的AddSchedule.vue界面
    router.push("/addSchedule");
}

async function removeItem(index) {
    let id = schedule.itemList[index].id
    //let { data } = await request.delete(`registraion/delete/${id}`)
    let { data } = await request.delete(`registration/delete/${id}`);
    if (data.code == 200) {
        showSchedule()
        alert("删除成功")
    } else if (data.code == 409) {
        alert("号源已被挂号，不可以删除了！")
    } else {
        alert("删除失败")
    }
}




</script>

<template>
    <div>
        <h3 class="ht">您的出诊日程如下</h3>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <th>出诊时间</th>
                <th>挂号数量</th>
                <th>审核进度</th>
                <th>操作</th>
            </tr>
            <tr class="ltr" v-for="item, index in schedule.itemList" :key="index">
                <td>
                    {{ item.date + " " + item.time }}
                </td>
                <td>
                    {{ item.count }}
                </td>
                <td>{{ item.checked }}</td>
                <td class="buttonContainer">
                    <button class="btn1" @click="removeItem(index)">删除</button>
                </td>
            </tr>
            <tr class="ltr buttonContainer">
                <td colspan="4">
                    <button class="btn1" @click="addItem()">新增日程</button>
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
