<template>
  <ClientOnly>
    <Notifications classes="bz-notification " />
  </ClientOnly>
</template>

<style lang="scss">
  .vue-notification-group .bz-notification {
    margin: var(--space-sm) var(--space-sm) 0;
    padding: var(--space-sm) var(--space-sm);
    font-size: var(--text-sm);
    line-height: 1.25;
    color: var(--body-color);

    background-color: var(--body-bg-alt);

    border: 1px solid var(--border-color);
    border-left: 7px solid #777;
    cursor: pointer;
    z-index: 99999;
    &.success {
      border-left-color: #42a85f;
    }
    &.warn {
      border-left-color: #f4a906;
    }
    &.error {
      border-left-color: #f53;
    }
    .notification-title {
      margin-bottom: var(--space-nano);
    }
  }
</style>
