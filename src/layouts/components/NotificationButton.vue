<template>
  <VBadge :content="cnt">
    <VIcon icon="bx-bell" size="24" />

    <!-- SECTION Menu -->
    <VMenu activator="parent" location="bottom end" offset="14px">
      <VList>
        <VListSubheader>알림</VListSubheader>
        <VListItem v-for="(notification, index) in notifications" :key="index" link>
          <div class="d-flex flex-row">
            <VIcon class="mr-3" icon="mdi-tooltip-check-outline" />
            <VListItemTitle>{{ notification.webNotificationMessage }}</VListItemTitle>
          </div>
          <VDivider />
        </VListItem>
      </VList>
    </VMenu>
  </VBadge>
</template>
<script setup>
import { useSSEStore } from '@/stores/useSSEStore.js'
import { ref, watch } from 'vue'

const notificationStore = useSSEStore()

const notifications = ref([...notificationStore.notifications])
const cnt = ref(notifications.value.length)

watch(
  () => notificationStore.notifications,
  newNotifications => {
    notifications.value = [...newNotifications]

    console.log(':::: cnt ::::', cnt.value)
    console.log(':::: notification ::::', notifications.value)
  },
  { deep: true },
)

watch(
  () => notifications.value.length,
  newCnt => {
    cnt.value = newCnt
  },
)
</script>
