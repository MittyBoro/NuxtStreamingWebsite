
  class IndexedDBStore {
  DB = indexedDB;
  dataBase = '';
  storeName = 'dataStore';

  constructor(dataBase) {
    this.dataBase = dataBase;
  }

  open() {
    return new Promise((resolve, reject) => {
      const request = this.DB.open(this.dataBase);

      request.onupgradeneeded = () => {
        request.result.createObjectStore(this.storeName);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  query(mode, requestCallback) {
    return new Promise((resolve, reject) => {
      const oRequest = this.DB.open(this.dataBase);
      oRequest.onsuccess = () => {
        const db = oRequest.result;
        const tx = db.transaction(this.storeName, mode);
        const st = tx.objectStore(this.storeName);
        const sRequest = requestCallback(st);
        sRequest.onsuccess = () => {
          resolve(sRequest.result);
        };
        sRequest.onerror = () => {
          reject(sRequest.error);
        };
      };
      oRequest.onerror = () => {
        reject(oRequest.error);
      };
    });
  }

  setItem(key, value) {
    return this.query('readwrite', store => store.put(value, key));
  }

  getItem(key) {
    return this.query('readonly', store => store.get(key));
  }

  removeItem(key) {
    return this.query('readwrite', store => store.delete(key));
  }
}

const getIdbData = async (key) => {
  await idb.open();
  return await idb.getItem(key);
}

function track (url, params = {}) {
  const body = new FormData();
  Object.keys(params).forEach((key) => {
    body.append(key, params[key]);
  });

  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body,
  }).then((data) => {
    console.log('trackSuccess', {data})
  }).catch((reason) => {
    console.log('trackError', {reason})
  });
}

const idb = new IndexedDBStore('pushNotifications');
let __options;

/**
 * Handle click event
 */
self.addEventListener('notificationclick', event => {
  const {cId, id, url, optionalVars, trackingUrl, statClickRoute} = __options;
  const _trackingUrl = `${trackingUrl}?c=${cId}&ps=push&purl=${encodeURIComponent(url)}${optionalVars ? `&${optionalVars}` : ''}`;
  console.log('[### _trackingUrl]--------', _trackingUrl);

  track(statClickRoute, {
    message_id: id,
  });
  event.notification.close();
  event.waitUntil(clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(clientList => {
    for (let i = 0; i < clientList.length; i++) {
      const client = clientList[i];
      if (client.url == _trackingUrl && 'focus' in client) {
        return client.focus();
      }
    }
    return clients.openWindow(_trackingUrl);
  }));
});

/**
 * Handle push event
 */
self.addEventListener('push', async (event) => {
  if (!(Notification && Notification.permission === 'granted')) {
    console.error('Permission not granted');
    return;
  }

  try {
    const data = event.data.json();
    const options = {
      ...data.options,
      requireInteraction: true
    };
    __options = Object.assign({}, options, {
      id: data.id,
      url: data.url,
      cId: await getIdbData('cId'),
      optionalVars: await getIdbData('ov'),
      trackingUrl: await getIdbData('trackingUrl'),
      statClickRoute: await getIdbData('statClickRoute'),
    });
    const statViewRoute = await getIdbData('statViewRoute');
    console.log({data});

    self.registration.showNotification(options.title, options).then(() => {
      track(statViewRoute, {
        message_id: data.id,
      });
      self.registration.update();
    });
  } catch (e) {
    console.error(e);
  }
});
