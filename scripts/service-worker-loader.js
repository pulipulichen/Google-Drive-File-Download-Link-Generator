let enableSeviceWorker = true

if (location.href.startsWith('http://127.0.0.1')) {
  enableSeviceWorker = false
}
//enableSeviceWorker = false
if ('serviceWorker' in navigator && enableSeviceWorker) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {

      // registration failed
      console.log('ServiceWorker registration failed: ', err);
    });
}