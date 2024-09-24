export default defineAppConfig({
  videosPerPage: 18,

  nuxtIcon: {
    class: 'nuxt-icon',
    iconifyApiOptions: {
      publicApiFallback: true,
    },
  },

  genders: [
    {
      key: null,
      value: 'Не указан',
    },
    {
      key: 'female',
      value: 'Девушка',
    },
    {
      key: 'male',
      value: 'Парень',
    },
    {
      key: 'trans',
      value: 'Транс',
    },
    {
      key: 'other',
      value: 'Другой',
    },
  ],

  sorting: {
    actors: [
      {
        key: 'video_count',
        name: 'По кол-ву видео',
        query: {
          o: undefined,
        },
      },
      {
        key: 'rating',
        name: 'По рейтингу',
        query: {
          o: 'rating',
        },
      },
      {
        key: 'name-asc',
        name: 'По алфавиту',
        query: {
          o: 'name-asc',
        },
      },
    ],
    actorsGender: [
      {
        key: 'female',
        name: 'Девушки',
        query: {
          gender: undefined,
        },
      },
      {
        key: 'male',
        name: 'Парни',
        query: {
          gender: 'male',
        },
      },
      {
        key: 'all',
        name: 'Все',
        query: {
          gender: 'all',
        },
      },
    ],
    studios: [
      {
        key: 'video_count',
        name: 'По количеству видео',
        query: {
          o: undefined,
          page: undefined,
        },
      },
      {
        key: 'title-asc',
        name: 'По алфавиту',
        query: {
          o: 'title-asc',
          page: undefined,
        },
      },
    ],
    videos: [
      {
        key: 'latest',
        name: 'Новые',
        query: {
          o: undefined,
          page: undefined,
        },
      },
      {
        key: 'rating',
        name: 'Лучшие',
        query: {
          o: 'rating',
          page: undefined,
        },
      },
      {
        key: 'views',
        name: 'Самые горячие',
        query: {
          o: 'views',
          page: undefined,
        },
      },
      {
        key: 'premium',
        name: 'Премиум',
      },
    ],
    categories: [
      {
        key: 'default',
        name: 'Лучшие',
        query: {
          o: undefined,
        },
      },
      {
        key: 'alphabet',
        name: 'По алфавиту',
        query: {
          o: 'alphabet',
        },
      },
    ],
  },

  subscriptions: {
    types: {
      email: 'Email',
    },
    events: {
      e_new_content: 'Новый контент',
      e_week_content: 'Подборки недели',
      e_referral: 'Реферальная программа',
      e_comment_reply: 'Ответы на комментарии',
      e_promotion: 'Акции и специальные предложения',
      e_critical: 'Важные события',
      e_other: 'Прочие события',
    },
  },
})
