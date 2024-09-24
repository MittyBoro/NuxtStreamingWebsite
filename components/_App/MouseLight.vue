<template>
  <div class="mouse-light" :style="[lightStyle]"></div>
</template>

<script setup>
  const lightStyle = reactive({
    top: '-9999px',
    left: '-9999px',
  })

  const modal = useModal()

  watch(modal.value, () => {
    if (modal.value.active) {
      handleBlackHoleEnter()
    } else {
      handleBlackHoleLeave()
    }
  })

  const handleTracking = (event) => {
    if (window.outerWidth < 992) return

    const position = getPositionByEvent(event)

    lightStyle.top = position.y + 'px'
    lightStyle.left = position.x + 'px'
  }

  const handleBlackHoleEnter = () => {
    lightStyle.opacity = 0
  }

  const handleBlackHoleLeave = () => {
    delete lightStyle.opacity
  }

  onMounted(() => {
    document.addEventListener('touchmove', handleTracking)
    document.addEventListener('mousemove', handleTracking)

    document.querySelectorAll('.blackhole').forEach((element) => {
      element.addEventListener('mouseenter', handleBlackHoleEnter)
      element.addEventListener('mouseleave', handleBlackHoleLeave)
    })
  })
  onUnmounted(() => {
    document.removeEventListener('touchmove', handleTracking)
    document.removeEventListener('mousemove', handleTracking)

    document.querySelectorAll('.blackhole').forEach((element) => {
      element.removeEventListener('mouseenter', handleBlackHoleEnter)
      element.removeEventListener('mouseleave', handleBlackHoleLeave)
    })
  })
</script>

<style lang="scss" scoped>
  .mouse-light {
    position: fixed;
    width: 666px;
    height: 666px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    opacity: 0.3;
    transition: opacity 0.2s;
    background: radial-gradient(
      farthest-side,
      var(--primary),
      var(--body-bg) 100%
    );
  }
</style>
