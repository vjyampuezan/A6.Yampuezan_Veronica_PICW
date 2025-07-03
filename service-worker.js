const CACHE_NAME = 'pwa-Facturas';
const archivosParaCachear = [
    './',
    './index.html',
    './public/css/estilos.css',
    './manifest.json',
    './public/js/clientes.js',
    './public/js/factura.js',
    './public/js/productos.js',
    './public/img/Logo_ESPE.png'

];

self.addEventListener('install', (event) => {
    console.log('Servicio Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Servicio Worker: Instalando...ok')
                return cache.addAll(archivosParaCachear);
            })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Servicio Worker: Interceptando petición a:', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then((respuestaCache) => {
                if (respuestaCache) {
                    console.log('Servicio Worker: Devolviendo del cache:', event.request.url);
                    return respuestaCache;
                }
                console.log('Servicio Worker: Haciendo petición a la red:', event.request.url);
                return fetch(event.request);
            })
    );
});