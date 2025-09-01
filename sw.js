const CACHE="duo90-v2";
const ASSETS=["./","./index.html"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k===CACHE?null:caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(u.origin===location.origin){e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(cc=>cc.put(e.request,copy));return r;}).catch(()=>caches.match("./index.html"))));}});
