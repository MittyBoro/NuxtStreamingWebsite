export function getPositionByEvent(event) {
  const position = {
    x: 0,
    y: 0,
  }

  if (event.touches?.length > 0) {
    position.y = event.touches[0].clientY
    position.x = event.touches[0].clientX
  } else {
    position.y = event.clientY
    position.x = event.clientX
  }
  return position
}
