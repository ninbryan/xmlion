
const {isArray} = Array;
const clone = (array) => array.slice(0);
const join = (array) => array.join('');
const map = (fn, array) => array.map(fn);
const filter = (fn, array) => array.filter(fn);
const concat = (array, ...arrays) => array.concat(...arrays);
const toStringCub = (c) => c == null ? '' : c.ROARS ? c._buildElementString() : c;
const mapCubsToString = (cubs) => map(toStringCub, cubs);

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
        return clone(this._cubs);
    }
    
    setCubs(cubs) {
        return this.cubs = cubs;
    }
    
    getCubs() {
        return this.cubs;
    }
    
    _buildAttributeString() {
        const attr = this.attr;
        const keys = Object.keys(attr);
        if (keys.length > 0) {
            return join(map((key) => ` ${key}="${attr[key]}"`, keys));
        }
        return '';
    }

    _buildContentString() {
        return join(mapCubsToString(this._cubs));
    }

    _buildElementString() {
        const me = this;
        const tagName = me.tagName;
        const attributes = me._buildAttributeString();

        if (me.hasCubs()) {
            const content = me._buildContentString();

            return `<${tagName}${attributes}>${content}</${tagName}>`;
        }
        else {
            return `<${tagName}${attributes}/>`;
        }
    }

    addAttribute(name, value) {
        const lion = this;
        lion.attr[name] = value;
        return lion;
    }

    removeAttribute(name) {
        const lion = this;
        if (lion.attr[name]) {
            delete lion.attr[name];
        }
        return lion;
    }

    addAttributes(attr) {
        const lion = this;
        const names = Object.keys(attr);
        map((name) => lion.addAttribute(name, attr[name]), names);
        return lion;
    }

    addCub(cub) {
        const lion = this;
        lion._cubs.push(cub);
        return lion;
    }

    removeCub(cub) {
        let lion = this;
        let index = lion._cubs.indexOf(cub);
        if (index >= 0) {
            lion.cubs = filter((c, i) => (i != index), lion.cubs);
        }
        return lion;
    }

    addCubs(cubs) {
        if(isArray(cubs)){
            this.cubs = concat(this.cubs, cubs);
        }
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