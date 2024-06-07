import dayjs from 'dayjs'

/**
 * @description 중첩 객체 동결 함수. 객체를 받아서 객체의 모든 속성을 동결한다.
 * @param object
 * @returns {unknown[]}
 */
export const deepFreeze = object => {
  Object.entries(object).forEach(([key, value]) => {
    if (value && typeof value === 'object') deepFreeze(value)
  })
  return Object.freeze(object)
}

/**
 * @description 소수점 이하를 제거하는 함수.
 * @param number
 * @returns {number}
 */
export const removeDecimal = number => {
  return Math.round(number)
}

/**
 * @description 날짜를 받아서 'YYYY-MM-DD' 형식으로 변환하는 함수.
 * @param {Date | string} date - 변환할 날짜 객체나 문자열.
 * @returns {string} 'YYYY-MM-DD' 형식의 문자열.
 */
export const formatDate = date => {
  return dayjs(date).format('YYYY-MM-DD')
}
