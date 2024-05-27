<template>
  <div>
    <header>
      <button @click="prev()">Prev</button>
      <button @click="next()">Next</button>
    </header>
    <section class="calendar-outer-container">
      <FullCalendar ref="calendarRef" :options="state.calendarOptions" />
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'

import FullCalendar from '@fullcalendar/vue3'

import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'

const calendarRef = ref()

/*
FullCalendar는 인스턴스 메서드인 getApi를 제공합니다.
이 메서드는 FullCalendar 인스턴스의 다양한 기능에 접근할 수 있는 API 객체를 반환합니다. 
이 API 객체를 통해 우리는 캘린더의 다양한 기능(예: 다음/이전 달로 이동, 이벤트 추가 등)을 제어할 수 있습니다.
*/
const calendarApi = ref()

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

function createEventId() {
  return String(eventGuid++)
}
const handleEvents = events => {
  state.currentEvents = events
  console.log(calendarRef.value)

  //viewTitle.value = calendar.value.getDate().toDateString();
}

const state = reactive({
  calendarOptions: {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listWeek',
    },
    events: [
      {
        id: createEventId(),
        title: 'All-day event',
        start: todayStr,
      },
      {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00',
      },
      // repeating events
      {
        title: 'my recurring event',
        rrule: 'DTSTART:20210603T103000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;UNTIL=20210630;BYWEEKDAY=MO',
      },
      {
        id: createEventId(),
        title: '전예은이랑 카공',
        start: '2024-05-24',
      },
    ],
    displayEventTime: false,
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, listPlugin, interactionPlugin, rrulePlugin],

    eventsSet: handleEvents,
  },

  currentEvents: [],
})

function getEvents() {
  return [
    // one-time events
    {
      id: createEventId(),
      title: 'All-day event',
      start: todayStr,
    },
    {
      id: createEventId(),
      title: 'Timed event',
      start: todayStr + 'T12:00:00',
    },
    // repeating events
    {
      title: 'my recurring event',
      rrule: 'DTSTART:20210603T103000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;UNTIL=20210630;BYWEEKDAY=MO',
    },
  ]
}

// external buttons
const next = () => calendarApi.value.next()
const prev = () => calendarApi.value.prev()

onMounted(() => {
  let events = getEvents()
  if (calendarRef.value) {
    // @ts-ignore
    calendarApi.value = calendarRef.value.getApi()
    calendarApi.value.addEventSource(events)
    //console.log(calendarApi.value);
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/calendar';
</style>
