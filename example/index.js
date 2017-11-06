const app = new Vuue({
    el      : '#app',
    data    : {
        show   : false,
        name   : 'caoyi',
        age    : 18,
        address: {
            city: '北京'
        }
    },
    computed: {
        info: function () {
            return `计算出来的属性-> 姓名: ${this.name}, 年龄: ${this.age}`;
        }
    }
});
app.$watch('age', function () {
    console.log('$watch==age改变了');

});
app.test   = function () {
    this.$data.name = 'caoyi11111';
    this.$data.age  = 100;
    this.$data.name = 'caoyi22222';
};
window.app = app;