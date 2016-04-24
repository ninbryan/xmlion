# xmlion

```javascript

// import xmlion
import xmlion from 'xmlion';

// create a lion
const divTest = xmlion('div', {class:'test'}, ['text']);

// lion.value() returns a string
divTest.value() == '<div class="test">text</div>';

// lion.addAttribute(name, value)
divTest.addAttribute('data-power', 1);

divTest.value() == '<div class="test" data-power="1">text</div>';

// lion.removeAttribute(name)
divTest.removeAttribute('class');

divTest.value() == '<div data-power="1">text</div>';

// try the hyperscript-helpers
import helper from 'hyperscript-helpers';
const factory = helper(xmlion);
const {div} = factory;

// still works the same
const divTest1 = xmlion('div', {class:'test','data-power':1}, ['text']);
const divTest2 = div({class:'test','data-power':1}, ['text']);

divTest1.value() == divTest2.value(); // probably?

```