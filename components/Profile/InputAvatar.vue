<template>
  <label class="field-image">
    <input
      type="file"
      @change="setImage"
      accept="image/*"
      style="display: none"
    />
    <div>
      <div class="button button-alt button-mini" :class="{ loading: loading }">
        Выбрать изображение
      </div>
      <div
        v-if="modelValue || Object.keys(user.avatar || {}).length"
        class="remove-avatar"
        @click.prevent="removeAvatar"
      >
        Удалить аватар
      </div>
    </div>
    <Avatar
      class="field__avatar"
      :src="currentAvatar"
      shadow="8px"
      sizes="240px"
    />
  </label>
  <ModalAvatar
    :imageFile="imageFile"
    @update="setAvatar"
    v-if="modal.active == 'avatar'"
  />
</template>

<script setup>
  const user = useApiUser()
  const imageFile = ref(null)
  const currentAvatar = ref(user.value?.avatar)

  const loading = ref(false)

  const modelValue = defineModel()

  const modal = useModal()

  const setAvatar = (blob) => {
    setTimeout(() => {
      modal.value.active = null
      useNotify().notify('Не забудьте нажать кнопку «Сохранить»')
    }, 200)
    if (blob) {
      currentAvatar.value = URL.createObjectURL(blob)
      modelValue.value = [
        { file: new File([blob], 'avatar.png', { type: 'image/png' }) },
      ] // blob
    }
  }

  const removeAvatar = () => {
    modelValue.value = null
    currentAvatar.value = null
  }

  const setImage = (e) => {
    const file = e.target.files[0]
    loading.value = true
    if (file.type.indexOf('image/') === -1) {
      useNotify().error('Пожалуйста, выберите изображение')
      return
    }

    if (typeof FileReader === 'function') {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result

        img.onload = () => {
          if (img.width >= 300 && img.height >= 300) {
            imageFile.value = event.target.result
            modal.value.active = 'avatar'
          } else {
            useNotify().error(
              'Размеры изображения должны быть не менее 300×300px',
            )
          }
        }
        setTimeout(() => {
          loading.value = false
        }, 400)
      }
      reader.readAsDataURL(file)
    } else {
      useNotify().error('Sorry, FileReader API is not supported')
    }
  }
</script>

<style lang="scss" scoped>
  .field-image {
    display: grid;
    grid-template-columns: auto 150px;
    align-items: center;
    gap: var(--space-sm);

    .button {
      width: 100%;
    }
    .field__avatar {
      width: 150px;
    }
    @include media-breakpoint-down(md) {
      display: inline-flex;
      flex-direction: column-reverse;
      .field__avatar {
        margin: var(--space-sm) 0;
        width: 100px;
      }
    }
  }
  .remove-avatar {
    margin-top: var(--space-xs);
    font-size: var(--text-xs);
    cursor: pointer;
    text-align: center;
  }
</style>
