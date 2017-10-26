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
    let nodeValue = node.nodeValue;
    if (!nodeValue || nodeValue === '') return;

    const tokens = textParser(nodeValue);
    if (!tokens) return;

    //对于 “姓名: {{name}}劳斯莱斯”，创建3个node，来进行处理
    tokens.forEach(token => {
        if (token.tag) {//指令节点
            let value = token.value;
            let el    = document.createTextNode('');
            _.before(el, node);
            this._bindDirective(value, el);
        } else {//文本节点
            let el = document.createTextNode(token.value);
            _.before(el, node);
        }
    }, this);

    _.remove(node);

};

/**
 * 创建directive,
 * @param expression 模板中{{value}}中value
 * @param node  {{value}}实现的node
 * @private
 */
exports._bindDirective = function (expression, node) {
    // let dirs = this._directives;
    let directive = new Directive(node, this, expression);
    // dirs.push(directive);

    this._createBingingAt(expression);
    // let directives =  this._rootBinding[expression]._subs ||  (this._rootBinding[expression]._subs=[]);
    //
    // directives.push(directive);//todo 只处理一层
};