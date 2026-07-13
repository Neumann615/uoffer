import type { CommonDialogType } from "~/type/common-dialog";

export function useCommonDialog() {
    const { $Mitt } = useNuxtApp()
    function setCommonDialogStatus(type: CommonDialogType, show: boolean) {
        $Mitt.emit('control-common-dialog', {
            type,
            show
        })
    }
    return {
        setCommonDialogStatus
    }
}