module.exports = {
    parser       : "babel-eslint",
    env          : {
        browser: true, //浏览器中全局变量
        node   : true, //node 中全局变量
        es6    : true, //es6全局变量
    },
    parserOptions: {
        ecmaVersion: 6
    },
    globals      : {
        Vuue: false
    },
    rules        : {
        // 禁用 console
        "no-console"                : 1,
        //设置缩进为4个字符
        "indent"                    : [2, 4, {"SwitchCase": 1}],
        //强制文件最大行数
        "max-lines"                 : ["error", 150],
        //强制方法最大语句数
        "max-statements"            : ["error", 30],
        // 要求构造函数首字母大写  （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
        "new-cap"                   : [2, {"newIsCap": true, "capIsNew": false}],
        // 不允许空格和 tab 混合缩进
        "no-mixed-spaces-and-tabs"  : 2,
        // 不允许使用嵌套的三元表达式
        "no-nested-ternary"         : 0,
        // 强制回调函数最大嵌套深度 5层
        "max-nested-callbacks"      : [1, 5],
        //禁用稀疏数组
        "no-sparse-arrays"          : 2,
        //禁止对 function 声明重新赋值
        "no-func-assign"            : 2,
        //禁止重新声明变量
        "no-redeclare"              : 2,
        //禁止使用魔术数字
        "no-magic-numbers"          : 2,
        //禁止删除变量
        "no-delete-var"             : 2,
        //需要把立即执行的函数包裹起来
        "wrap-iife"                 : [2, "any"],
        //禁止出现未使用过的变量
        "no-unused-vars"            : 2,
        //禁止将标识符定义为受限的名字
        "no-shadow-restricted-names": 2,
        //禁止在变量定义之前使用它们
        "no-use-before-define"      : 2,
        //要求将变量声明放在它们作用域的顶部
        "vars-on-top"               : 2,

        //ES6
        // 要求使用 let 或 const 而不是 var
        "no-var": 0,
    }
};