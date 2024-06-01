<script setup>
import { ref, reactive } from 'vue'
/* 导入发送请求的axios对象 */
import request from '../utils/request'

import { useRouter } from 'vue-router'
const router = useRouter()

import { defineUser } from '../store/userStore';
import { definePatient } from '../store/patientStore';
let sysUser = defineUser()
let sysPatient = definePatient()



</script>

<template>
    <div>

    </div>
</template>
<style scoped>
.ht {
    text-align: center;
    color: cadetblue;
    font-family: 幼圆;
}

.tab {
    width: 500px;
    border: 5px solid cadetblue;
    margin: 0px auto;
    border-radius: 5px;
    font-family: 幼圆;
}

.ltr td {
    border: 1px solid powderblue;

}

.ipt {
    border: 0px;
    width: 50%;

}

.btn1 {
    border: 2px solid powderblue;
    border-radius: 4px;
    width: 60px;
    background-color: antiquewhite;

}

.msg {
    color: gold;
}

.buttonContainer {
    text-align: center;
}
</style>
