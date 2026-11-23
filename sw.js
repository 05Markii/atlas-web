// Atlas web (0.41): funciona sin conexión. Lo de la app (index) se pide primero a la red y, sin red, sale de la caché;
// (ignoreVary: algunos servidores mandan «Vary: Origin» y, si no, la caché no encuentra los JS sin conexión)
// el resto (JS, CSS, fotos de ejercicios, sonidos) sale de la caché y si no está se descarga y se guarda.
// La versión la pone scripts/web-post.mjs al compilar: con cada versión nueva se borra la caché anterior.
const V = 'atlas-1795466630736';
self.addEventListener('install', (e) => {
  // la app entera (JS, CSS, fuentes, iconos, sonidos): la lista la pone scripts/web-post.mjs; las fotos de ejercicios, al verlas
  e.waitUntil(caches.open(V).then((c) => c.addAll(['./', ...["./assets/cinzel-latin-600-normal-CH_LB4su.woff","./assets/cinzel-latin-600-normal-Dd5YO2UX.woff2","./assets/cinzel-latin-700-normal-C-gK7hA8.woff","./assets/cinzel-latin-700-normal-Dkw14w9r.woff2","./assets/cinzel-latin-ext-600-normal-BEFdM_VE.woff2","./assets/cinzel-latin-ext-600-normal-BY9Mq9iK.woff","./assets/cinzel-latin-ext-700-normal-C24KFjuG.woff2","./assets/cinzel-latin-ext-700-normal-CORa-yIv.woff","./assets/demo-s9dzovIm.js","./assets/h-back-DhOKyNwq.webp","./assets/h-back-labels-wKp3vrdR.png","./assets/h-front-Dn_QuimD.webp","./assets/h-front-labels-aNz7WHPy.png","./assets/index-ChnOexL0.js","./assets/index-oci7aOep.css","./assets/m-back-B4P_dFZJ.webp","./assets/m-back-labels-Dr_HGvEP.png","./assets/m-front-CYGk6xXD.webp","./assets/m-front-labels-Ciu5eX8X.png","./assets/web-BZiwuVNg.js","./assets/web-BhCHFsEj.js","./assets/web-C9ZMg6on.js","./assets/web-Ce51pg93.js","./assets/web-CvWl1UA9.js","./assets/web-TzoBlYdT.js","./assets/web-bRzGqxGN.js","./exercises.json","./gong.ogg","./gong.wav","./icons/icon-180.png","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png","./index.html","./logo.png","./manifest.webmanifest","./privacidad.html"]])));
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  if (r.mode === 'navigate') {
    e.respondWith(fetch(r).then((res) => { const cp = res.clone(); caches.open(V).then((c) => c.put('./index.html', cp)); return res; }).catch(() => caches.match('./index.html', { ignoreVary: true })));
    return;
  }
  e.respondWith(caches.match(r, { ignoreVary: true }).then((hit) => hit || fetch(r).then((res) => {
    if (res.ok) { const cp = res.clone(); caches.open(V).then((c) => c.put(r, cp)); }
    return res;
  })));
});
