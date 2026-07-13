import type { WebLoginResult } from "~/type/auth"

export const useAuthStore = defineStore("nuxt-store-auth", () => {
    const webLoginResult = ref<WebLoginResult>(
        {
            apiToken: "",
            area_code: "",
            email: "",
            expires_in: 0,
            phone: "",
            qqIMUserId: "",
            verify_phone: 0
        }
    )



    function setWebLoginResult(v: WebLoginResult) {
        webLoginResult.value = v
    }

    return {
        webLoginResult,
        setWebLoginResult
    }
},
    {
        persist: process.client && {
            storage: localStorage
        }
    }
)