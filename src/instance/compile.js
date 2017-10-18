import * as _ from '../util/index';
import Directive from '../directive';
import textParser from '../parses/text';

const NODE_TYPE_ELE  = 1;
const NODE_TYPE_TEXT = 3;

/**
 * 更新DOM
 * @private
 */
exports._compile = function () {
    // new Directive();
    this._compileNode(this.$el);

};


exports._compileNode = function (node) {
    switch (node.nodeType) {
        case NODE_TYPE_ELE:
            this._compileElement(node);
            break;
        case NODE_TYPE_TEXT:
            this._compileText(node);
            break;
        default:
            return;
    }
};

/**
 *
 * @param node
 * @private
 */
exports._compileElement = function (node) {
    if (node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }
};

/**
 * 更新DOM  在{{}}的dom前添加 空text元素，给这个空元素赋值
 * @param node
 * @private
 */
exports._compileText = function (node) {
    let tokens =
   /* let nodeValue = node.nodeValue;

    if (!nodeValue || nodeValue === '') return;

    const patt = /{{[\w|/.]+}}/g;
    let ret    = nodeValue.match(patt);
    if (!ret) return;

    ret.forEach(value => {
        let el = document.createTextNode('');
        node.parentNode.insertBefore(el, node);//todo 此处只对整个文本作用域处理，
        let property = value.replace(/[{}]/g, '');
        // let attr     = property.split('.');
        // for (let i = 0; i < attr.length; i++) {
        //     debugger;
        //     const FIREST = 0;
        //     if (i === FIREST) {
        //         property = this.$data[attr[i]];
        //     } else {
        //         property = property[attr[i]];
        //     }
        //
        // }
        // nodeValue = nodeValue.replace(value, property);
        this._bindDirective(property,el);
    }, this);

    _.remove(node);//删除原来的DOM
    //node.nodeValue = nodeValue;
    // this.currentNode.appendChild(document.createTextNode(nodeValue));*/

};

exports._bindDirective = function (expression, node) {
    let dirs = this._directives;
    dirs.push(
        new Directive(node, this, expression)
    )
};