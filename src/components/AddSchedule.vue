<script setup>
/* 导入pinia数据 */
import { defineUser } from '../store/userStore.js'
let sysUser = defineUser()
import { defineDocter } from '../store/docterStore.js'
import { ref, reactive, onUpdated, onMounted } from 'vue'
import request from '../utils/request'
import { useRouter } from 'vue-router';
let router = useRouter()

let sysDocter = defineDocter()

let schedule = reactive({
    uid: sysUser.uid,
    docterName: sysUser.realName,
    phone: sysDocter.phone, //联系电话
    year: 0, //年月日 均为 出诊时间
    month: 0,
    day: 0,
    time: "上午", //上午 || 下午 || 晚上 
    count: 0, //医生选择的挂号接待数量
    checked: "待审核", //审核进度：待审核 || 已通过 || 被驳回 
    availableCount: 0, //当前剩余挂号名额，方便用户挂号时查看
    hospital: sysDocter.hospital, //医生所属医院
    title: sysDocter.title, //医生的职称
    office: sysDocter.office, //医生所属科室
})


async function addSchedule() {
    schedule.availableCount = schedule.count;
    let { data } = await request.post("schedule/addSchedule", schedule)
    if (data.code == 200) {
        alert("操作成功")
    } else {
        alert("操作失败")
    }
    router.push("/showSchedule")
}

async function goback() {
    router.push("/showSchedule")
}
</script>

<template>
    <div>
        <h3 class="ht">填写新增的出诊信息</h3>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <th>出诊时间</th>
                <th>挂号数量</th>
            </tr>
            <tr class="ltr">
                <td>
                    <input type="text" v-model="schedule.year">年
                    <input type="text" v-model="schedule.month">月
                    <input type="text" v-model="schedule.day">日
                    <select name="time" id="time" v-model="schedule.time">
                        <option value="上午">上午</option>
                        <option value="下午">下午</option>
                        <option value="晚上">晚上</option>
                    </select>
                </td>
                <td>
                    <input type="text" v-model="schedule.count">
                </td>
            </tr>
            <tr class="ltr buttonContainer">
                <td colspan="4">
                    <button class="btn1" @click="addSchedule()">确认新增</button>
                    <button class="btn1" @click="goback()">返回</button>
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
    width: 50%;
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
