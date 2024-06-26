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
import ToPay from '../components/ToPay.vue'
import ChangePwd from '../components/changePwd.vue'
import CheckRegist from '../components/CheckRegist.vue'
import CheckSchedule from '../components/CheckSchedule.vue'
import ChangeUser from '../components/ChangeUser.vue'
import FindUser from '../components/FindUser.vue'
import ShowAdminLog from '../components/ShowAdminLog.vue'
import AddSchedule from '../components/AddSchedule.vue'


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
        {
            path: "/topay",
            component: ToPay
        },
        {
            path: "/changePwd",
            component: ChangePwd
        },
        {
            path: "/checkRegist",
            component: CheckRegist
        },
        {
            path: "/checkSchedule",
            component: CheckSchedule
        },
        {
            path: "/changeUser",
            component: ChangeUser
        },
        {
            path: "/findUser",
            component: FindUser
        },
        {
            path: "/showAdminLog",
            component: ShowAdminLog
        },
        {
            path: "/addSchedule",
            component: AddSchedule
        }
    ]
})

//路由 的全局前置守卫 判断是否可以访问showSchedule
router.beforeEach((to, from, next) => {
    if (to.path != "/login" && to.path != "/regist") {
        // 登陆过放行
        // 没登录 回到登录页
        if (sysUser.username == '' || sysUser.username == null) {
            next("/login")
        } else {
            if (sysUser.username == 'admin' && sysUser.userPwd == 'admin' && to.path != "/changePwd" && to.path!="/login" && to.path!="/regist") {
                alert("检测到当前管理员为 初始密码admin,请更改您的密码！")
                next("/changePwd");
            } else {
                next()
            }
        }

    } else {
        next()
    }

})
export default router