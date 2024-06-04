<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'

import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

// Components
import Footer from '@/layouts/components/GlobalFooter.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 horizontal Navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="bx-menu" />
        </IconBtn>

        <!--        &lt;!&ndash; 👉 Search &ndash;&gt;-->
        <!--        <div class="d-flex align-center cursor-pointer" style="user-select: none">-->
        <!--          &lt;!&ndash; 👉 Search Trigger button &ndash;&gt;-->
        <!--          <IconBtn>-->
        <!--            <VIcon icon="bx-search" />-->
        <!--          </IconBtn>-->

        <!--          <span class="d-none d-md-flex align-center text-disabled">-->
        <!--            <span class="me-3">Search</span>-->
        <!--            <span class="meta-key">&#8984;K</span>-->
        <!--          </span>-->
        <!--        </div>-->

        <VSpacer />

        <IconBtn class="me-2">
          <VIcon icon="bx-bell" />
        </IconBtn>

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <!-- 👉 Vertical Navbar -->
    <template #vertical-nav-content>
      <VerticalNavSectionTitle
        :item="{
          heading: '내 정보',
        }"
      />
      <VerticalNavLink
        :item="{
          title: '홈',
          icon: 'bx-home',
          to: '/',
        }"
      />
      <VerticalNavLink
        :item="{
          title: '마이 페이지',
          icon: 'mdi-account-cog-outline',
          to: '/mypage',
        }"
      />

      <!-- 👉 근태 -->
      <VerticalNavSectionTitle
        :item="{
          heading: '근태',
        }"
      />
      <VerticalNavLink
        :item="{
          title: '근태 관리',
          icon: 'bx-home',
          to: '/',
        }"
      />

      <!-- 👉 결재 -->
      <VerticalNavSectionTitle
        :item="{
          heading: '결재 관리',
        }"
      />
      <VerticalNavLink
        :item="{
          title: '결재 신청',
          icon: 'bx-barcode',
          to: '/approval/request',
        }"
      />
      <VerticalNavLink
        :item="{
          title: '결재 요청 관리',
          icon: 'bx-add-to-queue',
          to: '/approval/request/list',
        }"
      />
      <VerticalNavLink
        :item="{
          title: '결재 현황 관리',
          icon: 'bx-user-plus',
          to: '/approval/status/list',
        }"
      />

      <!-- 👉 좌석 -->
      <VerticalNavSectionTitle
        :item="{
          heading: '좌석 관리',
        }"
      />
      <VerticalNavLink
        :item="{
          title: '좌석 선택',
          icon: 'mdi-alpha-t-box-outline',
          to: '/seat',
        }"
      />

      <!-- 👉직원 -->
      <VerticalNavSectionTitle
        :item="{
          heading: '직원 관리',
        }"
      />
      <VerticalNavLink
        :item="{
          title: '직원 정보 조회',
          icon: 'mdi-alpha-t-box-outline',
          to: '/search',
        }"
      />

      <!-- 👉 에러 페이지 -->
      <VerticalNavSectionTitle
        :item="{
          heading: '개발 페이지',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Error',
          icon: 'bx-x',
          to: '/no-existence',
        }"
      />
      <VerticalNavLink
        :item="{
          title: '테스트 페이지',
          icon: 'bx-x',
          to: '/test',
        }"
      />
      <VerticalNavLink
        :item="{
          title: '로그인',
          icon: 'bx-log-in',
          to: '/login',
        }"
      />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
