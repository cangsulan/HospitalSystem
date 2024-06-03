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
                        log:"xxx 示例 xxxsdfsdfsnxm,cnx,cmx,cmx,mc,xmc,xmc,mx,cmx,mc,xmc,xmc,xmc,xcxmc,xmc,xmc,xm,cmx,cmx,cm,xmc,xmc,xmcx,mcxm,cm,xm,sdfsdfsdfsdf"
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
