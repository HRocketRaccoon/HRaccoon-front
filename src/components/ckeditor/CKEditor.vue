<template>
  <ckeditor v-model="localEditorData" :config="editorConfig" :editor="editor" @input="emitUpdate"></ckeditor>
</template>

<script setup>
import { ref, watch } from 'vue'
import '../../../ckeditor5/build/ckeditor.js'

const props = defineProps({
  editorData: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:editor-data'])

const localEditorData = ref(props.editorData)
const editor = ref(ClassicEditor)
const editorConfig = ref({
  // 에디터의 설정 추가
})

watch(
  () => props.editorData,
  newValue => {
    if (localEditorData.value !== newValue) {
      localEditorData.value = newValue
    }
  },
)

const emitUpdate = () => {
  emit('update:editor-data', localEditorData.value)
}
</script>
