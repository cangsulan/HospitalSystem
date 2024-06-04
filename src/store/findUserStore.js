/* 
专门用于存储他人用户状态信息的pinia

*/
import {
    defineStore
} from 'pinia'

export const defineFindUser = defineStore(
    "findUser", {
        state: () => {
            return {
                itemList: [{
                    uid: 0, //用户账号在数据库的uid
                    userPwd: "", //账号密码
                    username: 'zhangsan', //账号名，这是账号的名称，可以和真实姓名不同
                    userRole: "doctor", //身份 patient || doctor || admin
                    userChecked: "已通过", //审核进度：待审核 || 已通过 || 被驳回
                    idCard: "", //身份证号
                    realName: "", //真实姓名
                    address: "",
                    phone: "",

                    age: 0,
                    gender: "",

                    hospital: "", //所属医院
                    office: "", //科室
                    title: "", //职称
                    speciality: "", //专长

                    medicalHistory: "", //病历   
                }]
            }
        },
        getters: {

        },
        actions: {

        }
    }
)