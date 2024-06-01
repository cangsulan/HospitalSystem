/* 
专门用于存储用户状态信息的pinia

*/
import {defineStore} from 'pinia'

export const definePatient= defineStore(
    "patient",
    {
        state:()=>{
            return {
                idCard: "",//身份证号
                realName: "",//真实姓名
                age: 0,
                gender: "",
                address: "",
                phone: "",
                medicalHistory:"",//病历
            }
        },
        getters:{

        },
        actions:{

        }
    }
)
