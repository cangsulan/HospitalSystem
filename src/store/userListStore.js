/* 
专门用于存储用户状态信息的pinia

*/
import {
    defineStore
} from 'pinia'

export const defineUserList = defineStore(
    "userList", {
        state: () => {
            return {
                itemList: [
                    {
                        uid: 0, //用户账号在数据库的uid
                        username: 'zhangsan', //账号名，这是账号的名称，可以和真实姓名不同
                        userRole: "patient", //身份 patient || doctor || admin
                        userChecked: true, //当前用户账号有没有通过管理员审核
                        idCard: "38483049203840284", //身份证号
                        realName: "张三", //真实姓名
                        address: "北京市海淀区xxxxxxxx",
                        phone: "18819201903",
                    },
                    
                ]
            }
        },
        getters: {

        },
        actions: {

        }
    }
)