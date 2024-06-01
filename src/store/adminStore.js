/* 
专门用于存储用户状态信息的pinia
*/
import {defineStore} from 'pinia'

export const defineAdmin= defineStore(
    "admin",
    {
        state:()=>{
            return {
                idCard: "",//身份证号
                realName: "",//真实姓名
                address: "",
                phone: "",
            }
        },
        getters:{

        },
        actions:{

        }
    }
)
