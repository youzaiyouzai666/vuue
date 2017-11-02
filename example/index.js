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
app.$watch('age',function(){
    console.log('$watch==age改变了');

});
window.app = app;