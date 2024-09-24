export function getImageDimensions(url, callback = () => {}) {
  const img = new Image()

  img.onload = function () {
    const dimensions = {
      width: img.width,
      height: img.height,
    }
    callback(dimensions)
  }

  img.onerror = function () {
    callback({})
  }

  img.src = url
}
