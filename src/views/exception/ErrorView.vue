<template>
  <div class="misc-wrapper">
    <ErrorHeader
      error-code="404"
      error-description="요청하신 페이지를 찾을 수 없습니다."
      error-title="Page Not Found ⚠️"
    />

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <!--      <VImg :max-width="800" :src="misc404" alt="Coming Soon" class="mx-auto" />-->
      <VBtn class="mt-10" to="/"> 홈으로 돌아가기 </VBtn>
    </div>
  </div>
</template>

<script setup>
import ErrorHeader from '@/components/ErrorHeader.vue'
</script>

<style lang="scss">
.misc-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  min-block-size: calc(var(--vh, 1vh) * 100);
}
</style>
