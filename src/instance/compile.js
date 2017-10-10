exports._compile     = function () {
    this.fragment = document.createDocumentFragment();
    this._compileNode(this.$template);//todo
    this.$el.innerHTML = '';
    this.fragment.childNodes.forEach((child) =>{
        "use strict";
        this.$el.appendChild(child.cloneNode(true));
    })
};
const NODE_TYPE_ELE  = 1;
const NODE_TYPE_TEXT = 3;

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
    this.currentNode = document.createElement(node.tagName);
    this.fragment.appendChild(this.currentNode);//todo 多层处理，现在只有一层
    if (node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }
};

exports._compileText = function (node) {
    let nodeValue = node.nodeValue;

    if (!nodeValue || nodeValue === '') return;

    const patt = /{{\w+}}/g;
    let ret    = nodeValue.match(patt);
    if (!ret) return;

    ret.forEach(value => {
        const property = value.replace(/[{}]/g, '');
        nodeValue      = value.replace(value, this.$data[property]);
    }, this);

    //node.nodeValue = nodeValue;
    this.currentNode.appendChild(document.createTextNode(nodeValue));

};