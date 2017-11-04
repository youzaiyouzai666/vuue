/**
 * Created by CAOYI on 2017/11/4.
 */
export function compileGetter(path){
    path = path.split('.');
    let boby = 'if (o !=null';
    let pathString = 'o';
    let key;
    for (let i = 0; i < path.length - 1; i++) {
        key = path[i];
        pathString += `.${key}`;
        boby += ` && ${pathString} != null`;
    }
    key = path[path.length - 1];/*eslint no-magic-numbers: "off"*/
    pathString += `.${key}`;
    boby += `) return ${pathString}`;
    return new Function('o', boby);
}