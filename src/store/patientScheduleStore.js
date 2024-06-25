/* 
专门用于存储日程状态信息的pinia

*/
import {
    defineStore
} from 'pinia'

export const definePatientSchedule = defineStore(
    "patientScheduleList", {
        state: () => {
            return {
                itemList: [
                //     {
                //     uid: 0, //医生在数据库的id
                //     docterName: "",
                //     phone: "", //联系电话
                //     year: 2024, //年月日 均为 出诊时间
                //     month: 10,
                //     day: 8,
                //     time: "", //上午 || 下午 || 晚上 
                //     count: 0, //医生选择的挂号接待数量
                //     id: 0, //数据库中出诊日程的id，方便修改时找到对应的日程
                //     checked: "待审核", //审核进度：待审核 || 已通过 || 被驳回 
                //     availableCount: 0, //当前剩余挂号名额，方便用户挂号时查看
                //     hospital: "", //医生所属医院
                //     title: "", //医生的职称
                //     office: "", //医生所属科室

                //     date: "", //时间的完整表示
                // }, 
                ]
            }
        },
        getters: {

        },
        actions: {

        }
    }
)