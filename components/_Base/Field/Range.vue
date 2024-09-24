<template>
  <div class="range-slider-element">
    <div ref="rangeSliderRef"></div>
  </div>
</template>

<script setup>
  import noUiSlider from 'nouislider'

  const rangeSliderRef = ref(null)

  // define component props for the slider component
  const { min, max, step } = defineProps({
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
  })

  const minValue = defineModel('minValue', { default: 0 })
  const maxValue = defineModel('maxValue', { default: 0 })

  const updateRangeSlider = () => {
    rangeSliderRef.value.noUiSlider.updateOptions({
      range: { min, max },
    })
    rangeSliderRef.value.noUiSlider.set([
      parseInt(minValue.value || min),
      parseInt(maxValue.value || max),
    ])
  }

  onMounted(() => {
    noUiSlider.create(rangeSliderRef.value, {
      start: [min, max],
      connect: true,
      step: step,
      tooltips: {
        to: (value) => new Intl.NumberFormat('ru-RU').format(value),
      },
      range: {
        min: min,
        max: max,
      },
    })

    rangeSliderRef.value.noUiSlider.on('update', (values, handle) => {
      let newMin = parseInt(values[0])
      let newMax = parseInt(values[1])
      minValue.value = newMin <= min ? undefined : newMin
      maxValue.value = newMax >= max ? undefined : newMax
    })
    updateRangeSlider()
  })
</script>

<style lang="scss">
  .range-slider-element {
    position: relative;
    max-width: 100%;
    padding-top: 0.5em;
  }
  .noUi-target {
    margin: 0 4px;
    position: relative;
    height: 4px;
    user-select: none;
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      left: -4px;
      right: -4px;
      background: var(--border-color);
      border-radius: 5px;
    }
  }
  .noUi-base,
  .noUi-connects {
    position: relative;
    height: 100%;
    z-index: 1;
  }
  .noUi-connects {
    z-index: 0;
    overflow: hidden;
  }
  .noUi-connect,
  .noUi-origin {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .noUi-handle {
    position: absolute;
    display: flex;
    justify-content: center;
    top: -2px;
    right: -4px;
    height: 8px;
    width: 8px;
    box-sizing: border-box;
    background-color: var(--body-bg);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 0 3px var(--primary);
  }
  .noUi-tooltip {
    transform: translateY(1.5em);
    line-height: 1;
    font-size: var(--text-xs);
    font-weight: 600;
  }
  .noUi-connects {
    top: 0;
    right: 0;
  }
  .noUi-connect {
    background-color: var(--primary);
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
    transform-style: flat;
  }
  .noUi-origin {
    width: 100%;
    height: 0;
  }
</style>
