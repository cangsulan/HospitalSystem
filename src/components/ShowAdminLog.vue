<script setup>
//该界面用来展示从后端找到的管理员操作记录，
//包括 管理员删除的记录，和管理员修改记录，主要针对管理员修改用户信息那块


/* 导入pinia数据 */
import { defineUser } from '../store/userStore.js'
let sysUser = defineUser()
import { defineAdminLog } from '../store/adminLogStore.js';
let log = defineAdminLog()


import { ref, reactive, onUpdated, onMounted } from 'vue'
import request from '../utils/request'
import { useRouter } from 'vue-router'
const router = useRouter()




</script>

<template>
    <div>
        <h3 class="ht">管理员操作记录如下</h3>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <td> log描述:</td>
            </tr>
            <tr class="ltr" v-for="item, index in log.itemList" :key="index">
                <td>
                    {{ log.itemList[index].log }}
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
