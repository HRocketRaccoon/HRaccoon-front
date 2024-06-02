<template>
  <div class="text-center">
    <v-dialog transition="slide-x-transition" content-class="custom-dialog" width="500" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <VHover>
          <template v-slot:default="{ isHovering, props }">
            <VCard
              v-bind="(props, activatorProps)"
              :color="isHovering ? 'primary' : undefined"
              title="Todo List 바로가기!"
              dark
            ></VCard>
          </template>
        </VHover>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="TodoList" height="100vh">
          <v-card-text>
            <TodoList />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="뒤로가기" variant="text" @click="isActive.value = false"></v-btn>

            <!-- <v-btn color="surface-variant" text="Agree" variant="flat" @click="isActive.value = false"></v-btn> -->
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
import TodoList from '@/components/todo/TodoList.vue'
</script>

<style lang="scss">
.custom-dialog {
  position: absolute;
  right: 0;
  margin: 0;
  height: 100%;
}
.absolute {
  position: absolute;
}
</style>
