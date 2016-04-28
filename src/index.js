
const ROARS = true;

function Lion(tagName, attributes, cubs) {
    if(!this || !this.ROARS){
        return new Lion(tagName, attributes, cubs);
    }
    
    this.tagName = tagName;
    this.attr = attributes || {};
    this.cubs = cubs || [];
}

Lion.prototype.name = 'Lion';

Lion.prototype.ROARS = ROARS;

Lion.prototype._buildAttributeString = function(){
    let attributes = '';
    let keys = Object.keys(this.attr);
    if (keys.length > 0) {
        keys.forEach((key) => {
            attributes += ` ${key}="${this.attr[key]}"`;
        });
    }
    return attributes;
};

Lion.prototype._buildContentString = function(){
    return this.cubs.map((cub) => {
        if (cub == null) {
            return ''; 
        }
        if (cub.ROARS) {
            return cub._buildElementString();
        }
        
        return cub.toString();
    }).join('');
};

Lion.prototype._buildElementString = function() {
    let me = this;
    let tagName = me.tagName;
    let attributes = me._buildAttributeString();

    if (me.hasCubs()) {
        let content = me._buildContentString();

        return `<${tagName}${attributes}>${content}</${tagName}>`;
    }
    else {
        return `<${tagName}${attributes}/>`;
    }
};

Lion.prototype.addAttribute = function(name, value){
    this.attr[name] = value;
    return this;
};

Lion.prototype.removeAttribute = function(name){
    if( this.attr[name] ){
        delete this.attr[name];
    }
    return this;
};

Lion.prototype.addAttributes = function(attr){
    let lion = this;
    let names = Object.keys(attr);
    let len = names.length;
    for(let x = 0; x < len; x++ ){
        let name = names[x];
        lion.addAttribute(name, attr[name]);
    }
    return lion;
};

Lion.prototype.addCub = function (cub) {
    this.cubs.push(cub);
    return this;
};

Lion.prototype.removeCub = function (cub) {
    let lion = this;
    let index = lion.cubs.indexOf(cub);
    if (index >= 0) {
        lion.cubs = lion.cubs.filter((c, i) => (i != index));
    }
    return lion;
};

Lion.prototype.addCubs = function (cubs) {
    this.cubs = this.cubs.concat(cubs);
    return this;
};

Lion.prototype.removeAllCubs = function () {
    this.cubs = [];
    return this;
};

Lion.prototype.hasCubs = function () {
    return this.cubs && this.cubs.length > 0;
};

Lion.prototype.value = function(){
    return this._buildElementString();
};

module.exports = Lion;
