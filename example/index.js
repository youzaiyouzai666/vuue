const app = new Vuue({
    el  : '#app',
    data: {
        name   : 'caoyi',
        age    : 18,
        address: {
            city: '北京'
        }
    }
});
window.app = app;