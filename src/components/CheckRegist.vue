<script setup>
/* 导入pinia数据 */
import { defineUser } from '../store/userStore.js'
let sysUser = defineUser()
import { defineUserList } from '../store/userListStore.js'
let userList = defineUserList()


import { ref, reactive, onUpdated, onMounted } from 'vue'
import request from '../utils/request'

//挂载完毕后,立刻查询当前用户的所有日程信息,赋值给pinia
onMounted(async () => {
    showUserList()
})



async function agree(index) {
    let { data } = await request.post("userList/updateuserList", {
        uid: userList.itemList[index].uid,
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

async function disagree(index) {
    let { data } = await request.post("userList/updateuserList", {
        uid: userList.itemList[index].uid,
        flag: false,

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
showItem.itemList = userList.itemList.slice(showIndex.value, nextIndex.value);

async function showFirstPage() {
    //跳转到分页的首页
    showIndex.value = 0;
    nextIndex.value = showIndex.value + pageSize;
    if (nextIndex.value > userList.itemList.length) {
        nextIndex.value = userList.itemList.length;
    }
    showItem.itemList = userList.itemList.slice(showIndex.value, nextIndex.value);
}

async function showPrePage() {
    //上一页
    showIndex.value = showIndex.value - pageSize;
    nextIndex.value = showIndex.value + pageSize;
    if (showIndex.value < 0) {
        showIndex.value = 0;
        nextIndex.value = showIndex.value + pageSize;
    }
    if (nextIndex.value > userList.itemList.length) {
        nextIndex.value = userList.itemList.length;
    }
    showItem.itemList = userList.itemList.slice(showIndex.value, nextIndex.value);
}

async function showNextPage() {
    //下一页
    if (nextIndex.value >= userList.itemList.length) {
        alert("已经到底了~")
        return;
    }
    showIndex.value = showIndex.value + pageSize;
    nextIndex.value = nextIndex.value + pageSize;
    if (showIndex.value < 0) {
        showIndex.value = 0;
        nextIndex.value = showIndex.value + pageSize;
    }
    if (nextIndex.value > userList.itemList.length) {
        nextIndex.value = userList.itemList.length;
    }
    showItem.itemList = userList.itemList.slice(showIndex.value, nextIndex.value);
}


async function showUserList() {
    // 发送异步请求,获得当前待审核的所有信息
    let { data } = await request.get("userList/findAlluserList")
    userList.itemList = data.data.itemList




    if (userList.itemList.length < pageSize) {
        nextIndex.value = userList.itemList.length;
    }
    showItem.itemList = userList.itemList.slice(showIndex.value, nextIndex.value);
}



</script>

<template>
    <div>
        <h3 class="ht">待审核账号如下</h3>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <th>账号名</th>
                <th>身份</th>
                <th>真实姓名</th>
                <th>身份证号</th>
                <th>住址</th>
                <th>联系电话</th>
                <th>审核操作</th>
            </tr>
            <tr class="ltr" v-for="item, index in showItem.itemList" :key="index">
                <td>{{ item.username }}</td>
                <td>{{ item.userRole }}</td>
                <td>{{ item.realName }}</td>
                <td>{{ item.idCard }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.phone }}</td>
                <td class="buttonContainer">
                    <button class="btn1" @click="agree(index)">通过</button>
                    <button class="btn1" @click="disagree(index)">否决</button>
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
