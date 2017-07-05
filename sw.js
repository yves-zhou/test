setInterval(function(){
    console.log(1);
}, 2000);

this.addEventListener('install', function(event){
    event.waitUntil(caches.open('my-test-cache-v1').then(function(cache){
        return cache.addAll(['/', '/index.html','/index.js']);
    }))
})