import config from '../config';
export function before(el, target){
    target.parentNode.insertBefore(el,target);
}
export function remove(el){
    el.parentNode.removeChild(el);
}
export function attr(node,attr){
    attr = config.prefix + attr;
    let val = node.getAttribute(attr);
    if(val){
        node.removeAttribute(attr);
    }
    return val;
}