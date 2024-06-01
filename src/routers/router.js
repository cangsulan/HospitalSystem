import {
    createRouter,
    createWebHashHistory
} from 'vue-router'


import Login from '../components/Login.vue'
import Regist from '../components/Regist.vue'

import Docter from '../components/DocterHome.vue'
import Patient from '../components/PatientHome.vue'
import Admin from '../components/AdminHome.vue'
import Registration from '../components/Registration.vue'
import ShowSchedule from '../components/ShowSchedule.vue'

import pinia from '../pinia.js'
import {
    defineUser
} from '../store/userStore.js'

let sysUser = defineUser(pinia)


const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
            path: "/",
            redirect: "/login"
        },
        {
            path: "/docterhome",
            component: Docter
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/regist",
            component: Regist
        },
        {
            path: "/patienthome",
            component: Patient
        },
        {
            path: "/adminhome",
            component: Admin
        },
        {
            path: "/registration",
            component: Registration
        },
        {
            path: "/showSchedule",
            component: ShowSchedule
        },
    ]
})

// 路由 的全局前置守卫 判断是否可以访问showSchedule
// router.beforeEach((to,from,next)=>{
//     if(to.path == '/patienthome' || to.path=='/adminhome' || to.path=='/docterhome'){
//         // 登陆过放行
//         // 没登录 回到登录页
//         if(sysUser.username == ''){
//             next("/login")
//         }else{
//             next()
//         }
//     }else{
//         next()
//     }

// })

export default router