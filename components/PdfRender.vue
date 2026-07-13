<script setup lang="ts">
import * as pdfjsLib from "pdfjs-dist"
import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api"
import { onMounted, ref } from "vue"

const props = defineProps({
  pdfUrl: {
    type: String,
    required: true,
  },
})
const pdfContainer = ref<HTMLDivElement>()
const isLoading = ref(true)

async function renderPdfPage(pdf: PDFDocumentProxy, pageNumber: number) {
  return new Promise((resolve) => {
    if (!pdfContainer.value) {
      resolve(true)
    }
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    pdf.getPage(pageNumber).then(async (page) => {
      const scale = 2
      const viewport = page.getViewport({ scale: scale })
      canvas.width = viewport.width
      canvas.height = viewport.height
      canvas.style.width = "100%"
      canvas.style.height = "100%"

      const renderContext: any = {
        canvasContext: context,
        viewport: viewport,
      }

      await page.render(renderContext).promise

      if (pdfContainer.value) {
        pdfContainer.value.appendChild(canvas)
        resolve(true)
      }
    })
  })
}

async function loadPdf() {
  const url = props.pdfUrl
  if (!url?.length) {
    return
  }
  const loadingTask = pdfjsLib.getDocument(url)
  try {
    loadingTask.promise.then(async (pdf) => {
      if (pdf && pdf._pdfInfo.numPages) {
        let arr = []
        for (let i = 1; i <= pdf._pdfInfo.numPages; i++) {
          arr.push(i)
        }
        for (let i of arr) {
          await renderPdfPage(pdf, i)
          if (i === arr[arr.length - 1]) {
            isLoading.value = false
          }
        }
      }
    })
  } catch (error) {
    console.error("Error loading PDF:", error)
  }
}

onMounted(() => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs"
  loadPdf()
})
</script>

<template>
  <div class="w-full ha relative">
    <div
      v-if="isLoading"
      class="flex items-center justify-center absolute left-0 top-0 w-full h-300 bg-#fff"
    >
      <img class="w-180" src="/img/loading.gif" />
    </div>
    <div
      ref="pdfContainer"
      :style="{ opacity: isLoading ? 0 : 1 }"
      class="w-full ha transition-1000"
    ></div>
  </div>
</template>
