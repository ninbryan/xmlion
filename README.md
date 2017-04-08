# xmlion

[![NPM](https://nodei.co/npm/xmlion.png)](https://nodei.co/npm/xmlion/)

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

```javascript

// import xmlion
import {xmlion} from 'xmlion';

// create a lion
const lion = xmlion('div', {class:'cat'}, ['meow']);

// lion.value() returns a string
lion.value() == '<div class="cat">meow</div>';

// lion.addAttribute(name, value)
lion.addAttribute('data-attribute', 'pride');

lion.value() == '<div class="cat" data-attribute="pride">meow</div>';

// lion.removeAttribute(name)
lion.removeAttribute('class');

lion.value() == '<div data-attribute="pride">meow</div>';

// try the hyperscript-helpers
import helper from 'hyperscript-helpers';
const factory = helper(xmlion);
const {div} = factory;

// still works the same
const lion1 = xmlion('div', {class:'cat','data-attribute':'pride'}, ['meow']);
const lion2 = div({class:'cat','data-attribute':'pride'}, ['meow']);

lion1.value() == lion2.value(); // probably?

// lion can add a cub
lion.addCub(lion1);

lion.value() == '<div data-attribute="pride">meow<div class="cat" data-attribute="pride">meow</div></div>';

// lion can remove a cub
lion.removeCub(lion1);

lion.value() == '<div data-attribute="pride">meow</div>';

// lion can add many cubs
lion.addCubs([lion1, lion2]);

lion.value() == '<div data-attribute="pride">meow<div class="cat" data-attribute="pride">meow</div><div class="cat" data-attribute="pride">meow</div></div>';

// lion can remove all cubs
lion.removeAllCubs();

lion.value() == '<div data-attribute="pride"/>';

```