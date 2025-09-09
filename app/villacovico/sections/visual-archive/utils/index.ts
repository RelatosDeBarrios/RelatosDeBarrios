// implement modulo operator to get next and previous index in a circular array
export const getNextIndex = (currentIndex: number, length: number) => {
  return (currentIndex + 1) % length
}
export const getPrevIndex = (currentIndex: number, length: number) => {
  return (currentIndex - 1 + length) % length
}
