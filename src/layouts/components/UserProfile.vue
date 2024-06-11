<script setup></script>

<template>
  <VBadge bordered color="success" dot location="bottom right" offset-x="3" offset-y="3">
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <!--      VIMg-->

      <!-- SECTION Menu -->
      <VMenu activator="parent" location="bottom end" offset="14px" width="230">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge color="success" dot location="bottom right" offset-x="3" offset-y="3">
                  <VAvatar color="primary" variant="tonal">
                    <!-- Vimg -->
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold"> John Doe </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="bx-user" size="22" />
            </template>

            <VListItemTitle>MyPage</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="bx-cog" size="22" />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- 👉 FAQ -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="bx-help-circle" size="22" />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </VAvatar>
  </VBadge>
</template>
