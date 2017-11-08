/**
 * Created by CAOYI on 2017/10/27.
 */
export default {
    update: function(){
        let properties = this.expression.split('.');
        let value      = this.vm.$data;
        properties.forEach((property) => {
            value = value[property];
        });

        this.el[this.attr] = value;
        console.log(`更新了DOM-${this.expression}`, value);
    }
};