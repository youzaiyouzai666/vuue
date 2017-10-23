/**
 * eg：对于 “姓名: {{name}}劳斯莱斯”，来返回三个对象
 * @param text
 * @returns {Array}
 */
export default function parse(text) {
    let tokens    = [];//内部属性包括{tag:是否是变量,value:值}
    const tagRE   = /\{?\{\{(.+?)\}\}\}?/g;//非贪婪模式匹配{}
    let match,
        index,
        lastIndex = 0;//
    while (match = tagRE.exec(text)) {
        index = match.index;//匹配到的字符位于原始字符串的基于0的索引值

        //1.处理{{}}前面字符
        if (index > lastIndex) {
            tokens.push({
                tag  : false,
                value: text.slice(lastIndex, index),
            });
        }

        //2.处理{{}}内代码
        tokens.push({
            tag  : true,
            value: match[1].trim(),//[1]表示第一个分组 只处理{{}}中的前后空格
        });

        lastIndex = tagRE.lastIndex;//下一次匹配开始的位置
    }

    //3.处理{{}}后代码
    /*eslint no-magic-numbers: "off"*/
    if(lastIndex < text.length - 1){
        tokens.push({
            tag  : false,
            value: text.slice(lastIndex),//[1]表示第一个分组
        })
    }

    return tokens;

}