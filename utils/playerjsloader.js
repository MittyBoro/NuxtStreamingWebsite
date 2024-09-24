export const loadPlayerJs = async () =>
  new Promise((res) => {
    const script = document.createElement('script')
    script.onload = () => res()
    script.setAttribute('src', '/src/playerjs.js')
    script.setAttribute('async', 'true')
    document.head.appendChild(script)
  })
