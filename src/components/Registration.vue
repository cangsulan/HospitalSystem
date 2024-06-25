<script setup>
import { ref, reactive, onMounted, onUpdated } from 'vue'
/* 导入发送请求的axios对象 */
import request from '../utils/request'
//做支付界面时用到路由传参
import { useRouter } from 'vue-router';
let router = useRouter()
//定义动态路由路径传参方法
let transmit = (index) => {
    router.push({ path: "/topay", query: { index: index } })
}



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

router.beforeEach((to, from, next) => {
    if (to.name == "/registration") {
        showSchedule()
        showPatientSchedule()
    }
    next();
})


async function showPatientSchedule() {
    let { data } = await request.get("registration/getSelfRegistration");
    if (data.code == 200) {
        patientSchedule.itemList = [];

        for (let index in data.data) {
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
            patientSchedule.itemList.push(geted);
        }
    } else {

    }


}


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




//要加一个分页的功能
let showIndex = ref(0)
let showItem = reactive({
    itemList: [],
})
let pageSize = 10;
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


async function showSchedule() {
    let { data } = await request.get("registration/getAfterRegistration")
    if (data.code == 200) {
        schedule.itemList = [];

        for (let index in data.data) {
            let geted = new scheduleClass();
            geted.docterName = data.data[index].doctorName;
            geted.id = data.data[index].id;
            geted.uid = data.data[index].uid;
            geted.phone = data.data[index].phone;
            geted.date = data.data[index].date;
            geted.count = data.data[index].count;
            geted.hospital = data.data[index].hospital;
            geted.title = data.data[index].title;
            geted.availableCount = data.data[index].availableCount;
            geted.office = data.data[index].office;
            if (data.data[index].time == 0) {
                geted.time = "早上"
            } else if (data.data[index].time == 1) {
                geted.time = "下午"
            }
            if (data.data[index].checked == 0) {
                geted.checked = "待审核"
            } else {
                geted.checked = "已通过"
            }
            schedule.itemList.push(geted)
        }
    } else {
        alert("信息获取出错，请稍后再试！")
    }
    if (schedule.itemList.length < pageSize) {
        nextIndex.value = schedule.itemList.length;
    }
    showItem.itemList = schedule.itemList.slice(showIndex.value, nextIndex.value);

}

//根据showItem的index找到在schedule中的index
async function TransformIndex(index) {
    return showIndex.value + index;
}

async function toApply(id, index) {
    let { data } = await request.get(`registration/registration/${id}`);
    if (data.code == 200) {
        alert("挂号成功！前往支付！")
        transmit(await TransformIndex(index));
    } else if (data.code == 407) {
        let v = confirm("您已经挂了该号了，若没有支付，请按【确定】前往支付");
        if (v) {
            transmit(await TransformIndex(index));
        }
    } else {
        alert("挂号失败！")
    }
}


//刷新当前网页
function refresh() {
    showPatientSchedule()
    showSchedule()
}

</script>

<template>
    <div>
        <div style="text-align: center;">
            <h7 class="ht">要挂号请及时 获取最新信息！</h7>
            <button class="btn1" @click="refresh()">获取最新信息</button>
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
                <td>{{ item.date + " " + item.time }}</td>
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
            <tr class="ltr" v-for="item, index in showItem.itemList" :key="index">
                <td>{{ item.docterName }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.hospital }}</td>
                <td>{{ item.office }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.date + " " + item.time }}</td>
                <td>{{ item.availableCount }}</td>
                <td class="buttonContainer">
                    <button class="btn1" @click="toApply(item.id, index)">挂号</button>
                </td>
            </tr>
        </table>
        <br>
        <div style="text-align: center;">
            <button @click="showFirstPage()">首页</button>
            <button style="margin-right: 20px;margin-left:20px;" @click="showPrePage()">上一页</button>
            <button @click="showNextPage()">下一页</button>
        </div>
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
