<template>
  <ModalLayoutSmall :loading="loading" class="modal__avatar">
    <div class="modal__avatar-content">
      <div class="modal__title">Выбор миниатюры</div>

      <div class="content">
        <section class="cropper-area">
          <div class="img-cropper">
            <VueCropper
              ref="cropperRef"
              class="field-file__cropper"
              :minCanvasWidth="300"
              :minCropBoxWidth="100"
              :movable="false"
              :aspect-ratio="1"
              :rotatable="true"
              :zoomable="false"
              :minWidth="300"
              :src="imgSrc"
              preview=".field-file__preview"
            />
          </div>
        </section>
        <section class="preview-area">
          <div class="field-file__preview"></div>
          <div class="cropped-image">
            <img v-if="cropImg" :src="cropImg" alt="Cropped Image" />
            <div v-else class="crop-placeholder" />
          </div>
        </section>
      </div>

      <div class="button-row">
        <div
          class="button button-mini"
          @click.passive="updateImage()"
          :class="{ loading: loading }"
        >
          Обновить
        </div>
      </div>
    </div>
  </ModalLayoutSmall>
</template>

<script setup>
  import VueCropper from 'vue-cropperjs'
  import 'cropperjs/dist/cropper.css'

  const loading = ref(false)

  const { imageFile } = defineProps(['imageFile'])
  const emit = defineEmits(['update'])

  const imgSrc = computed(() => imageFile)

  const cropImg = ref(null)

  const cropperRef = ref(null)

  const updateImage = () => {
    loading.value = true
    cropperRef.value.getCroppedCanvas().toBlob((blob) => emit('update', blob))
  }

  onUnmounted(() => {
    loading.value = false
  })
</script>

<style lang="scss" scoped>
  .modal__avatar-content {
    width: 100%;
    max-width: 460px;
  }

  .modal__subtitle {
    margin: calc(var(--space-sm) * -0.5) 0 var(--space-sm);
  }

  .field-image {
    &__cropper {
      width: 100%;
      max-width: 100%;
    }
  }
  .button-row {
    margin-top: var(--space-base);
    text-align: center;
  }
</style>

<style lang="scss">
  .modal__avatar {
    .cropper-crop-box,
    .cropper-face {
      opacity: 1;
      background: transparent;
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url(~/assets/images/mask_circle.svg) no-repeat 50% 50%;
        background-size: cover;
        opacity: 0.3;
      }
    }
    .cropper-point {
      background-color: var(--primary);
    }
    .cropper-line {
      background-color: var(--primary);
    }
    .cropper-view-box {
      outline-color: var(--primary);
    }
  }
</style>
