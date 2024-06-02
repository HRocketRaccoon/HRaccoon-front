<template>
  <VContainer style="max-width: 500px">
    <VTextField v-model="newTask" label="해야 할 일을 입력하세요." variant="solo" @keydown.enter="create">
      <template v-slot:append-inner>
        <VFadeTransition>
          <VBtn v-show="newTask" icon="mdi-plus-circle" variant="text" @click="create"></VBtn>
        </VFadeTransition>
      </template>
    </VTextField>

    <VRow align="center" class="my-1">
      <strong class="mx-4 text-info-darken-2">
        Tasks:&nbsp;
        <VFadeTransition leave-absolute>
          <span :key="tasks.length">
            {{ tasks.length }}
          </span>
        </VFadeTransition>
      </strong>

      <strong class="mx-4 text-info-darken-2"> Remaining: {{ remainingTasks() }} </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 text-success-darken-2"> Completed: {{ completedTasks() }} </strong>

      <VProgressCircular :value="progress()" class="me-2"></VProgressCircular>
    </VRow>

    <VDivider class="mb-4"></VDivider>

    <VCard v-if="tasks.length > 0">
      <VSlideYTransition class="py-0" tag="VList" group>
        <div v-for="(task, i) in tasks" :key="`${i}-${task.text}`">
          <VDivider v-if="i !== 0" :key="`${i}-divider`"></VDivider>

          <VListItem @click="task.done = !task.done">
            <template v-slot:prepend>
              <VCheckbox v-model="task.done" color="grey"></VCheckbox>
            </template>

            <VListItemTitle>
              <span :class="task.done ? 'text-grey done' : 'text-primary'">{{ task.text }}</span>
            </VListItemTitle>

            <template v-slot:append>
              <VExpandXTransition>
                <!-- <VIcon v-if="task.done" color="success"> mdi-check </VIcon> -->
                <!-- <v-btn fab ripple small color="red" v-if="task.done" @click="removeTodo(i)">
                  <v-icon class="white--text">mdi-close</v-icon>
                </v-btn> -->
                <img
                  v-if="task.done"
                  class="delete-btn"
                  @click="removeTodo(i)"
                  style="cursor: pointer"
                  src="@/assets/circle-substract.png"
                />
              </VExpandXTransition>
            </template>
          </VListItem>
        </div>
      </VSlideYTransition>
    </VCard>
  </VContainer>
</template>

<script setup>
import { ref } from 'vue'

const tasks = ref([
  {
    done: false,
    text: 'Foobar',
  },
  {
    done: false,
    text: 'Fizzbuzz',
  },
])
const newTask = ref(null)

const completedTasks = () => {
  return tasks.value.filter(task => task.done).length
}
const progress = () => {
  return (completedTasks() / tasks.value.length) * 100
}
const remainingTasks = () => {
  return tasks.value.length - completedTasks()
}

const create = () => {
  tasks.value.push({
    done: false,
    text: newTask.value,
  })
  newTask.value = null
}

const removeTodo = index => {
  tasks.value.splice(index, 1)
}
</script>

<style lang="scss">
.v-selection-control__input input {
  position: absolute;
  left: 8px;
  top: 0;
  width: 20px;
  opacity: 1;
}
.done {
  text-decoration: line-through;
}
.delete-btn {
  height: 30px;
}
</style>
