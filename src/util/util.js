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
