<template>
  <div
    class="dropdown"
    :class="{
      'dropdown--active': active,
      'dropdown--hovering': hovering,
      'dropdown--hidden': isHidden,
    }"
  >
    <slot></slot>
    <ClientOnly>
      <div
        ref="elementRef"
        class="dropdown__element blackhole"
        :class="[position, { 'dropdown__element--list': isList }]"
        @click.passive="hide"
      >
        <slot name="list"></slot>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
  defineProps({
    isList: {
      type: Boolean,
      default: true,
    },
    hovering: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'right',
      validator: (value) => {
        return ['right', 'left', 'full'].includes(value)
      },
    },
  })
  const isHidden = ref(false)
  const elementRef = ref(null)

  const active = defineModel('active', {
    default: false,
  })

  const hide = () => {
    if (isHidden.value) return
    isHidden.value = true
    setTimeout(() => {
      isHidden.value = false
    }, 300)
  }

  const clickOutside = (event) => {
    if (!elementRef.value?.contains(event.target)) {
      active.value = false
      hide()
    }
  }
  if (process.client) {
    onMounted(() => {
      watch(
        () => active.value,
        (value) => {
          if (value) {
            setTimeout(() => {
              document.addEventListener('click', clickOutside, {
                passive: true,
              })
            }, 500)
          } else {
            document.removeEventListener('click', clickOutside)
          }
        },
      )
    })
  }
</script>
