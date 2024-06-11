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

/**
 * @description 날짜를 받아서 오프셋 정보를 제외한 ISO 8601 형식(Java의 LocalDateTime과 호환)으로 변환하는 함수.
 * @param {Date | string} date - 변환할 날짜 객체 또는 날짜 문자열.
 * @returns {string} - 'YYYY-MM-DDTHH:mm:ss' 형식의 문자열.
 */
export const formatLocalDateTime = date => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss')
}

/**
 * 주어진 객체에서 값을 통해 키를 찾습니다.
 * @param {Object} obj - 검색할 객체.
 * @param {any} value - 해당하는 키를 찾을 값.
 * @returns {string} - 값에 해당하는 키.
 */
export const getKeyByValue = (obj, value) => {
  for (const [key, val] of Object.entries(obj)) {
    if (val === value) {
      return key
    }
  }
}
