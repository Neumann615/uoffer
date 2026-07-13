import type { CourseSearchOptions, VideoAssets } from "~/type"
import { useAuthStore } from "./auth"

export const useCommonStore = defineStore("nuxt-store-common", () => {
    const courseSearchOptions = ref<CourseSearchOptions>({
        fees: {
            max: 0,
            min: 0
        },
        categories: [],
        levels: [],
        locations: [],
        starSchoolMonths: [],
        universities: []
    })
    const videoAssets = ref<VideoAssets>({
        url_1: '',
        url_2: '',
        url_3: ''
    })
    const cartList = ref([])

    async function getCourseSearchOptions() {
        const { data }: any = await useFetch("/api/web/course/search/options")
        courseSearchOptions.value = data.value

    }

    async function getVideoAssets() {
        const { data }: any = await useFetch('/api/cms_video/web/detail')
        videoAssets.value = data.value
    }

    async function getCartList() {
        const { webLoginResult } = useAuthStore()
        const { data }: any = await useFetch('/api/web/my/cart/list', {
            headers: {
                Token: webLoginResult.apiToken
            }
        })
        cartList.value = data.value?.items || []
    }

    return {
        courseSearchOptions,
        videoAssets,
        cartList,
        getVideoAssets,
        getCourseSearchOptions,
        getCartList
    }
},
    {
        persist: process.client && {
            storage: localStorage
        }
    }
)