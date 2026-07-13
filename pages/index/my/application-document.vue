<script setup lang="ts">
const documents = ref([
  { id: 1, name: "护照信息页", required: true, uploaded: true, fileName: "passport.pdf" },
  { id: 2, name: "学历证书", required: true, uploaded: true, fileName: "degree.pdf" },
  { id: 3, name: "成绩单", required: true, uploaded: false, fileName: "" },
  { id: 4, name: "语言成绩（雅思/托福）", required: true, uploaded: false, fileName: "" },
  { id: 5, name: "个人陈述（PS）", required: true, uploaded: true, fileName: "ps.pdf" },
  { id: 6, name: "推荐信", required: true, uploaded: false, fileName: "" },
  { id: 7, name: "工作/实习证明", required: false, uploaded: false, fileName: "" },
  { id: 8, name: "获奖证书", required: false, uploaded: true, fileName: "awards.pdf" },
]);

const uploadingId = ref<number | null>(null);

function handleUpload(docId: number) {
  uploadingId.value = docId;
  setTimeout(() => {
    const doc = documents.value.find((d) => d.id === docId);
    if (doc) {
      doc.uploaded = true;
      doc.fileName = `document_${docId}.pdf`;
    }
    uploadingId.value = null;
  }, 1500);
}
</script>

<template>
  <div class="ma w-[80%] mb-200">
    <div class="mb-36 mt-80 text-20 font-550 color-#666">申请文件</div>

    <div class="bg-white rounded-8 border-1 border-#eee">
      <div
        v-for="doc in documents"
        :key="doc.id"
        class="flex items-center justify-between pa-20 border-b-1 border-#f0f0f0 last:border-b-0"
      >
        <div class="flex items-center gap-12">
          <div
            class="w-8 h-8 rounded-full"
            :class="doc.required ? 'bg-red' : 'bg-#ccc'"
          ></div>
          <div>
            <div class="text-15">
              {{ doc.name }}
              <span v-if="doc.required" class="text-12 color-red ml-4">*必填</span>
            </div>
            <div v-if="doc.uploaded" class="text-13 color-#409eff mt-2">
              {{ doc.fileName }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-12">
          <ElTag v-if="doc.uploaded" type="success" size="small">已上传</ElTag>
          <ElTag v-else type="info" size="small">待上传</ElTag>
          <ElButton
            size="small"
            :type="doc.uploaded ? 'default' : 'primary'"
            :loading="uploadingId === doc.id"
            @click="handleUpload(doc.id)"
          >
            {{ doc.uploaded ? "重新上传" : "上传文件" }}
          </ElButton>
        </div>
      </div>
    </div>
  </div>
</template>
