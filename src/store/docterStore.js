/* 
专门用于存储用户状态信息的pinia

*/
import {
    defineStore
} from 'pinia'

export const defineDocter = defineStore(
    "docter", {
        state: () => {
            return {
                idCard: "", //身份证号
                realName: "", //真实姓名
                age: 0,
                gender: "",
                address: "",
                phone: "",
                hospital: "", //所属医院
                office: "", //科室
                title: "", //职称
                speciality: "", //专长

            }
        },
        getters: {

        },
        actions: {

        }
    }
)