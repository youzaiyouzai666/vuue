exports._compile     = function () {
    this.fragment = document.createDocumentFragment();
    this._compileNode(this.$template);
    this.$el.innerHTML = '';
    this.fragment.childNodes.forEach((child) =>{
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

    const patt = /{{[\w|/.]+}}/g;
    let ret    = nodeValue.match(patt);
    if (!ret) return;

    ret.forEach(value => {
        let property = value.replace(/[{}]/g, '');
        let attr = property.split('.');
        for(let i=0; i<attr.length; i++){
            const FIREST = 0;
            if(i===FIREST){
                property= this.$data[attr[i]];
            }else{
                property = property[attr[i]];
            }

        }
        nodeValue      = nodeValue.replace(value,property);
    }, this);

    //node.nodeValue = nodeValue;
    this.currentNode.appendChild(document.createTextNode(nodeValue));

};