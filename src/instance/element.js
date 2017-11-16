/**
 * Created by CAOYI on 2017/11/15.
 */
import _ from '../util';

/**
 * 初始化节点
 * @param el
 * @private
 */
exports._initElement = function (el) {
    if (typeof el === 'string') {
        let selector = el;
        this.$el = el = document.querySelector(el);
        if (!el) {
            _.warn(`Cannot find element: ${selector}`);
        }
    } else {
        this.$el = el;
    }
};
