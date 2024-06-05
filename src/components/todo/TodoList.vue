<template>
  <VContainer style="max-width: 500px">
    <VTextField v-model="todoInsert" label="해야 할 일을 입력하세요." variant="solo" @keydown.enter="addTodo">
      <template v-slot:append-inner>
        <VFadeTransition>
          <VBtn v-show="todoInsert" icon="mdi-plus-circle" variant="text" @click="addTodo"></VBtn>
        </VFadeTransition>
      </template>
    </VTextField>

    <VRow align="center" class="my-1">
      <strong class="mx-4 text-info-darken-2">
        Tasks:&nbsp;
        <VFadeTransition leave-absolute>
          <span :key="todos.length">
            {{ todos.length }}
          </span>
        </VFadeTransition>
      </strong>

      <strong class="mx-4 text-info-darken-2"> Remaining: {{ remainingTasks() }} </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 text-success-darken-2"> Completed: {{ completedTasks() }} </strong>

      <!-- <VProgressCircular :value="progress()" class="me-2"></VProgressCircular> -->
    </VRow>

    <VDivider class="mb-4"></VDivider>

    <VCard v-if="todos.length > 0">
      <VSlideYTransition class="py-0" tag="VList" group>
        <div v-for="(todo, i) in todos" :key="`${i}-${todo.todoContent}`">
          <VDivider v-if="i !== 0" :key="`${i}-divider`"></VDivider>

          <VListItem @click="todo.todoCompleteYn = !todo.todoCompleteYn">
            <template v-slot:prepend>
              <VCheckbox v-model="todo.todoCompleteYn" color="grey"></VCheckbox>
            </template>

            <VListItemTitle>
              <span :class="todo.todoCompleteYn ? 'text-grey done' : 'text-primary'">{{ todo.todoContent }}</span>
            </VListItemTitle>

            <template v-slot:append>
              <VExpandXTransition>
                <!-- <VIcon v-if="task.done" color="success"> mdi-check </VIcon> -->
                <!-- <v-btn fab ripple small color="red" v-if="task.done" @click="removeTodo(i)">
                  <v-icon class="white--text">mdi-close</v-icon>
                </v-btn> -->
                <img
                  v-if="todo.todoCompleteYn"
                  class="delete-btn"
                  @click="toggleDelete(todo.todoNo)"
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
import { onMounted, ref, watchEffect } from 'vue'
import axios from '@/api/axios'

// const tasks = ref([
//   {
//     done: false,
//     text: 'Foobar',
//   },
//   {
//     done: false,
//     text: 'Fizzbuzz',
//   },
// ])
const todos = ref([])

const todoInsert = ref('')

const todoChangeTrigger = ref(0)

const userNo = ref(1)

const completedTasks = () => {
  return todos.value.filter(todo => todo.todoCompleteYn).length
}
const progress = () => {
  return (completedTasks() / todos.value.length) * 100
}
const remainingTasks = () => {
  return todos.value.length - completedTasks()
}

const triggerTodoListRefresh = () => {
  todoChangeTrigger.value++ // Increment to trigger watchEffect
}

const getTodoList = async () => {
  try {
    const response = await axios.get(`/todo/list/${userNo.value}`)
    console.log('get todos success ! ', response)
    todos.value = response.data.data
  } catch (error) {
    console.log('Error get todos:', error)
  }
}

onMounted(() => {
  // userNo = sessionStorage.getItem('userNo')
  getTodoList()
})

watchEffect(() => {
  getTodoList()
  console.log('Todo list refreshed because of change trigger:', todoChangeTrigger.value)
})

const addTodo = async () => {
  try {
    const response = await axios.post('/todo/create', {
      todoContent: todoInsert.value,
      todoCompleteYn: false,
      todoDeleteYn: false,
      userNo: userNo.value,
    })
    todoInsert.value = ''
    triggerTodoListRefresh()
    console.log(todoChangeTrigger.value)
    console.log('save todo success ! ', response.data.data)
  } catch (error) {
    console.log('Error save todo:', error)
  }
}

const toggleChange = async todoNo => {
  try {
    const response = await axios.post(`/todo/complete/${todoNo}`)
    console.log('completed todo success ! ', response.data.data)
    triggerTodoListRefresh()
    console.log(todoChangeTrigger.value)
  } catch (error) {
    console.log('Error completed todo:', error)
  }
}

const toggleDelete = async todoNo => {
  try {
    const response = await axios.post(`/todo/delete/${todoNo}`)
    console.log('delete todo success ! ', response.data.data)
    triggerTodoListRefresh()
    console.log(todoChangeTrigger.value)
  } catch (error) {
    console.log('Error delete todo:', error)
  }
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
