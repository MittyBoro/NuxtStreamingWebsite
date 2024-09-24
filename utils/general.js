export const isComputed = (variable) =>
  typeof variable === 'object' && variable.effect

export const log = (...args) => console.log(...args)
