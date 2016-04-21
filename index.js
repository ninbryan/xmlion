
const ROARS = true;

function Lion(tagName, attributes, cubs) {
    if(!this || !this.ROARS){
        return new Lion(tagName, attributes, cubs);
    }
    
    this.tagName = tagName;
    this.attributes = attributes || {};
    this.cubs = cubs || [];
}

Lion.prototype.ROARS = ROARS;

Lion.prototype._buildAttributeString = function(){
    let attributes = '';
    let keys = Object.keys(this.attributes);
    if (keys.length > 0) {
        keys.forEach((key) => {
            attributes += ` ${key}="${this.attributes[key]}"`;
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

Lion.prototype.hasCubs = function(){
    return this.cubs && this.cubs.length > 0;
};

Lion.prototype.value = function(){
    return this._buildElementString();
};

module.exports = Lion;
