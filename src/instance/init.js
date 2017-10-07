exports._init = function(options){
    this.$data = options.data;
    this.$el   = document.querySelector(options.el);

    this.$mount();
};