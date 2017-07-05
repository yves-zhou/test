setInterval(function(){
    console.log(1);
}, 2000);

// this.addEventListener('install', function(event){
//     event.waitUntil(caches.open('my-test-cache-v1').then(function(cache){
//         return cache.addAll(['./', './index.html','./index.js']);
//     }))
// });

this.addEventListener('fetch', function(event){
    console.log('request',event.request)
    event.respondWith(caches.match(event.request).then(function(response){
        console.log('response',response);
        if(response){
            return response;
        }

        var request = event.request.clone();
        return fetch(request).then(function(httpRes){
            console.log('httpRes',httpRes);
            if(!httpRes && httpRes.status !== 200){
                return response;
            }

            var responseClone = httpRes.clone();
            caches.open('my-test-cache-v1').then(function(cache){
                cache.put(event.request, responseClone);
            });

            return httpRes;
        });
    }))
});