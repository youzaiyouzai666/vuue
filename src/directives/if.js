/**
 * Created by CAOYI on 2017/11/14.
 */
import config from '../config';
import * as _ from '../util/index';

export default {
    update: function () {

    },
    bind  : function () {
        let el = this.el;
        this.ref = document.createComment(`${config.prefix}-if`);
        _.after(this.ref, el);
        _.remove(el);
    }
};