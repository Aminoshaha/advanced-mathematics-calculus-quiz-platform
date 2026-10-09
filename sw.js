// 完整缓存界面、40 道题的解析及原图；安装失败不接管，避免半离线状态。
importScripts("./precache.js");
const PREFIX="calculus-pwa:"+new URL(self.registration.scope).pathname+":";
const CACHE=PREFIX+self.__PWA_REVISION;
const resources=self.__PWA_ASSETS.map(path=>new URL(path,self.registration.scope).href);
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(resources))));
self.addEventListener("activate",event=>event.waitUntil((async()=>{
  for(const name of await caches.keys())if(name.startsWith(PREFIX)&&name!==CACHE)await caches.delete(name);
  await self.clients.claim();
})()));
self.addEventListener("message",event=>{if(event.data?.type==="APPLY_UPDATE")self.skipWaiting();});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(event.request,{ignoreSearch:true});
    if(cached)return cached;
    try{return await fetch(event.request);}catch{
      if(event.request.mode==="navigate")return await cache.match(new URL("index.html",self.registration.scope));
      return new Response("离线资源不可用",{status:503});
    }
  })());
});
