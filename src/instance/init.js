exports._init = function (options) {
    this.$data = options.data;
    this.$el   = document.querySelector(options.el);
    this.$template = this.$el.cloneNode(true);

    this.observer = this.observer.create(this.$data);

    this.observer.on('set', this.$mount.bind(this));

    this.$mount();
};