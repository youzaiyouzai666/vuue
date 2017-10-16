export function before(el, target){
    target.parentNode.insertBefore(el,target);
}
export function remove(el){
    el.parentNode.removeChild(el);
}