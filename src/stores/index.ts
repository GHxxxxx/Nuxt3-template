import { defineStore } from "pinia";
const USER_INFO = {
    username:'admin'
}

export const useUserStore = defineStore('userInfo',()=>{
    const userInfo = ref(USER_INFO)

    return {
        userInfo
    }
})