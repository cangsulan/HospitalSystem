/* 
专门用于存储用户状态信息的pinia
*/
import {
    defineStore
} from 'pinia'

export const defineAdminLog = defineStore(
    "adminLog", {
        state: () => {
            return {
                itemList: [{
                    id: 0,
                    adminId: 0,
                    userId: 0,
                    userRole: "",
                    operationType: "",
                    originalValue: "",
                    modifyTime: "",
                    status: 0,
                }]
            }
        },
        getters: {

        },
        actions: {

        }
    }
)