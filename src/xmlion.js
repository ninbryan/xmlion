
const {isArray} = Array;

export class Lion {
    constructor(tagName, attributes, cubs) {
        this.tagName = tagName;
        this.attr = attributes || {};
        this._cubs = cubs || [];
    }
    
    get ROARS() {
        return true;
    }
    
    set cubs(cubs) {
        if (isArray(cubs)) {
            this._cubs = cubs;
        } else {
            throw 'Lion wants cubs[]';
        }
    }
    
    get cubs() {
        return this._cubs.slice(0);
    }
    
    _buildAttributeString() {
        let attributes = '';
        let keys = Object.keys(this.attr);
        if (keys.length > 0) {
            keys.forEach((key) => {
                attributes += ` ${key}="${this.attr[key]}"`;
            });
        }
        return attributes;
    }

    _buildContentString() {
        return this._cubs.map((cub) => {
            if (cub == null) {
                return '';
            }
            if (cub.ROARS) {
                return cub._buildElementString();
            }

            return cub.toString();
        }).join('');
    }

    _buildElementString() {
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
    }

    addAttribute(name, value) {
        this.attr[name] = value;
        return this;
    }

    removeAttribute(name) {
        if (this.attr[name]) {
            delete this.attr[name];
        }
        return this;
    }

    addAttributes(attr) {
        let lion = this;
        let names = Object.keys(attr);
        let len = names.length;
        for (let x = 0; x < len; x++) {
            let name = names[x];
            lion.addAttribute(name, attr[name]);
        }
        return lion;
    }

    addCub(cub) {
        this._cubs.push(cub);
        return this;
    }

    removeCub(cub) {
        let lion = this;
        let index = lion._cubs.indexOf(cub);
        if (index >= 0) {
            lion._cubs = lion._cubs.filter((c, i) => (i != index));
        }
        return lion;
    }

    addCubs(cubs) {
        this._cubs = this._cubs.concat(cubs);
        return this;
    }

    removeAllCubs() {
        this._cubs = [];
        return this;
    }

    hasCubs() {
        return this._cubs && this._cubs.length > 0;
    }
    
    value() {
        return this._buildElementString();
    }
}

export function xmlion(tagName, attributes, cubs) {
    return new Lion(tagName, attributes, cubs);
}

export default xmlion;

module.exports = xmlion;