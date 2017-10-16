/**
 *
 * @param to
 * @param from
 */
export function extend(to, from){
    for(let key in from){
        to[key] = from[key];
    }
    return to;
}