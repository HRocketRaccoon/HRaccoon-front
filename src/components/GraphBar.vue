<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { reactive, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  labels: Array,
  values: Array,
})

const chartData = reactive({
  labels: props.labels,
  datasets: [
    {
      data: props.values,
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
})

const chartOptions = reactive({
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 9,
      ticks: {
        stepSize: 1,
      },
    },
  },
  plugins: {
    legend: {
      display: false, // label을 보이지 않게 설정
    },
    title: {
      display: false, // title을 보이지 않게 설정
    },
  },
})

watch(
  () => props.labels,
  newLabels => {
    chartData.labels = newLabels
  },
)

watch(
  () => props.values,
  newValues => {
    chartData.datasets[0].data = newValues
  },
)
</script>
