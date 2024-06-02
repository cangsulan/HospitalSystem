/* 
专门用于存储用户状态信息的pinia

*/
import {
    defineStore
} from 'pinia'

export const defineUser = defineStore(
    "loginUser", {
        state: () => {
            return {
                uid: 0,//用户账号在数据库的uid
                userPwd:"",//账号密码
                username: 'zhangsan',//账号名，这是账号的名称，可以和真实姓名不同
                userRole: "patient",//身份 patient || doctor || admin
                userChecked: true,//当前用户账号有没有通过管理员审核

            }
        },
        getters: {

        },
        actions: {

        }
    }
)