<template>
  <div
    v-if="list.length || meta"
    class="chat__card card"
    :class="{ 'loading-box': pending }"
  >
    <div class="card__inner form-grid">
      <div class="profile__subtitle color" v-if="user.role == 'admin'">
        Вы являетесь админом, лучше пройдите в панель управления
      </div>
      <div class="profile__subtitle">Последние чаты</div>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th width="100%">Тема</th>
            <th>Последнее</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chat in list" :key="chat.id">
            <td>{{ chat.id }}</td>
            <td>
              <NuxtLink :to="`/chats/${chat.id}`" class="table__subject">
                <span>{{ chat.subject }}</span>
                <span v-if="chat.unread_messages_count" class="subj-new">
                  + {{ chat.unread_messages_count }}
                </span>
              </NuxtLink>
            </td>
            <td class="table__date">{{ formatDate(chat.created_at) }}</td>
          </tr>
        </tbody>
      </table>
      <LazyAppPagination :meta="meta" />
    </div>
  </div>
</template>

<script setup>
  const { list, meta, pending } = await useApiList('/../chats/chats', {
    per_page: 50,
  })

  const user = useApiUser()
</script>

<style lang="scss" scoped>
  .profile__subtitle {
    margin-bottom: 0;
  }
  .table__date {
    white-space: nowrap;
    @include media-breakpoint-down(md) {
      white-space: auto;
    }
  }
  .table__subject {
    display: block;
    font-weight: 600;
    .subj-new {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--alert);
    }
  }
</style>
