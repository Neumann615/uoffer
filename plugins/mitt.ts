// plugins/eventBus.ts
import mitt from 'mitt'
import type { CommonDialogType } from '~/type/common-dialog'

type EventType = {
    'control-common-dialog': {
        type: CommonDialogType
        show: boolean
    }
    // 添加更多事件类型...
}

export default defineNuxtPlugin(() => {
    const emitter = mitt<EventType>()

    return {
        provide: {
            Mitt: {
                emit: emitter.emit,
                on: emitter.on,
                off: emitter.off
            }
        }
    }
})