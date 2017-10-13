exports._updateBindingAt = function (){
    const path = arguments[0];

    this._directives.forEach((directive) => {
        if(directive.expression !== path) return;
        directive.update();
    });
};