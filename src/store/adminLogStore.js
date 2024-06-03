/* 
专门用于存储用户状态信息的pinia
*/
import {defineStore} from 'pinia'

export const defineAdminLog= defineStore(
    "adminLog",
    {
        state:()=>{
            return {
                itemList: [
                    {
                        id:0,
                        log: "jdlafjljslfajfjsfjlasjlfjslj计算逻辑发SDK发了撒娇放辣椒撒砥砺奋进啊射流风机收到了发，收到冷风机拉屎就发了撒娇发了撒娇奥拉夫撒了发的反，所发生的反馈艾师傅萨芬是反"
                    },
                    {
                        id:1,
                        log: "；撒 看反馈萨达；放得开首付款撒快递费；双端口反  kf精灵盛典放假了收到久啊傅雷家书啊冷风机塑料袋附件猎杀对决弗利萨觉得发了撒娇附录"
                    },
                ]
            }
        },
        getters:{

        },
        actions:{

        }
    }
)
