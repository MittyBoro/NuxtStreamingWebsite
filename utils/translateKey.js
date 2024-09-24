export function translateSubscriptionKey(key) {
  const obj = {
    chat_message: 'Сообщение в чат',
    chat_support_created: 'Новый чат',
    comment_new: 'Новый комментарий',
    comment_reply: 'Ответы на комментарий',
    payment_new: 'Новый платеж',
    user_coin: 'Реферальные начисления',
    user_new_referral: 'Новый реферал',
    user_premium: 'Получение премиума',
    user_premium_ending: 'Завершение премиума',
    video_completed: 'Завершение рендера',
    video_invalid: 'Ошибки в видео',
    video_published: 'Публикация видео',
    album_published: 'Публикация фото',
    news: 'Новости',
    system: 'Системные',
  }

  return obj[key] || key
}

export function translateEntityKey(key) {
  const obj = {
    videos: 'Видео',
    albums: 'Фото',
    actors: 'Модели',
    news: 'Новости',
    comments: 'Комментарии',
    payments: 'Платежи',
    chats: 'Чаты',
    subscriptions: 'Подписки',
    reactions: 'Реакции',
    messages: 'Сообщения',
    notifications: 'Уведомления',
    settings: 'Настройки',
    categories: 'Категории',
    studios: 'Студии',
  }

  return obj[key] || key
}

export function translateKeyByGender(key, gender = null, plural = false) {
  const obj = {
    // genders
    male: !plural ? 'Парень' : 'Парни',
    female: !plural ? 'Девушка' : 'Девушки',
    trans: !plural ? 'Транс' : 'Трансы',
    other: 'Другое',

    // relation_status
    single: !plural ? 'Одинока' : 'Одни',
    married: 'В браке',

    // orientations
    hetero: 'Гетеро',
    bi: 'Би',
    gay: !plural ? 'Гей' : 'Геи',
    lesbian: 'Лесби',

    // ethnicities
    ethnicity_asian: !plural ? 'Азиатка' : 'Азиатки',
    ethnicity_black: 'Афро',
    ethnicity_latino: !plural ? 'Латино' : 'Латино',
    ethnicity_middle_eastern: !plural ? 'Ближневосточная' : 'Ближневосточные',
    ethnicity_indian: !plural ? 'Индианка' : 'Индианки',
    ethnicity_white: !plural ? 'Белая' : 'Белые',
    ethnicity_other: !plural ? 'Другая' : 'Другие',

    // hair_colors
    hair_bald: !plural ? 'Лысая' : 'Лысые',
    hair_black: 'Чёрные волосы',
    hair_blonde: !plural ? 'Блондинка' : 'Блондинки',
    hair_brunette: !plural ? 'Брюнетка' : 'Брюнетки',
    hair_grey: 'Пепельные волосы',
    hair_red: !plural ? 'Рыжая' : 'Рыжие',
    hair_various: 'Разноцветные',
    hair_other: 'Другие',

    // eye_colors
    eye_blue: 'Голубые',
    eye_brown: 'Карие',
    eye_green: 'Зелёные',
    eye_gray: 'Серые',
    eye_other: 'Другие',

    // features
    feature_beautiful: 'Самые красивые',
    feature_young: 'Молодые',
    feature_milf: 'Зрелые',
    feature_small: 'Миниатюрные',
    feature_tall: 'Высокие',
  }

  if (gender === 'male') {
    obj.single = !plural ? 'Холост' : 'Холостые'
    obj.ethnicity_asian = !plural ? 'Азиат' : 'Азиаты'
    obj.ethnicity_indian = !plural ? 'Индиец' : 'Индийцы'
    obj.ethnicity_white = !plural ? 'Белый' : 'Белые'
    obj.hair_bald = !plural ? 'Лысый' : 'Лысые'
    obj.hair_blonde = !plural ? 'Блондин' : 'Блондины'
    obj.hair_brunette = !plural ? 'Брюнет' : 'Брюнеты'
    obj.hair_red = !plural ? 'Рыжий' : 'Рыжие'
  }

  return obj[key] || key
}

export function translateYesNo(value, yes = 'Да', no = 'Нет', none = '') {
  if (value === 'yes') {
    return yes
  } else if (value === 'no') {
    return no
  } else {
    return none
  }
}

export function actorKeysToString(q) {
  let titleArray = []

  const country = getCountryDeclensionsByCode(q.country)[1]

  if (q.features) {
    titleArray.push(
      translateKeyByGender(q.features, q.gender, true).toLowerCase(),
    )
  }
  if (q.ethnicity) {
    titleArray.push(
      translateKeyByGender(q.ethnicity, q.gender, true).toLowerCase(),
    )
  }
  if (q.gender) {
    titleArray.push(
      translateKeyByGender(q.gender, q.gender, true).toLowerCase(),
    )
  }
  if (q.hair_color) {
    titleArray.push(
      translateKeyByGender(q.hair_color, q.gender, true).toLowerCase(),
    )
  }
  if (country) {
    titleArray.push('из ' + country)
  }
  if (q.min_age) {
    titleArray.push(
      `старше ${q.min_age} ` + declension(q.min_age, ['года', 'лет', 'лет']),
    )
  }
  if (q.min_age && q.max_age) {
    titleArray.push(`и`)
  }
  if (q.max_age) {
    titleArray.push(
      `младше ${q.max_age} ` + declension(q.max_age, ['года', 'лет', 'лет']),
    )
  }
  if (q.boob_size) {
    titleArray.push(
      translateKeyByGender(q.boob_size, q.gender, true).toLowerCase(),
    )
  }
  if (q.fake_boobs) {
    titleArray.push(
      translateYesNo(
        q.fake_boobs,
        'с силиконовыми сиськами',
        'с натуральными сиськами',
      ),
    )
  }

  return titleArray.length ? ' — ' + titleArray.join(' ') : ''
}
