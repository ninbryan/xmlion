import xmlion from './src/index';
import test from 'tape';

test('empty elements', (assert) => {
    let actual = xmlion('xml').value();
    
    assert.equal(actual, '<xml/>', 'xmlion must make empty elements');
    
    assert.end();
});

test('attributed elements', (assert) => {
    let actual = xmlion('xml', {attr:'test'}).value();
    
    assert.equal(actual, '<xml attr="test"/>', 'xmlion must make attributed elements');
    
    assert.end();
});

test('attributed elements with content', (assert) => {
    let actual = xmlion('xml', {attr:'test'}, ['test']).value();
    
    assert.equal(actual, '<xml attr="test">test</xml>', 'xmlion must make attributed elements with content');
    
    assert.end();
});

test('attributed elements with two cubs', (assert) => {
    let actual = xmlion('xml', {attr:'test'}, ['test',xmlion('xml', {attr:'test'}, ['test'])]).value();
    
    assert.equal(actual, '<xml attr="test">test<xml attr="test">test</xml></xml>', 'xmlion must make complex attributed elements with content');
    
    assert.end();
});

test('attributed elements with empty values', (assert) => {
    let actual = xmlion('xml', {attr:'test'}, [null,undefined,NaN,0]).value();
    
    assert.equal(actual, '<xml attr="test">NaN0</xml>', 'xmlion must make complex attributed elements with content');
    
    assert.end();
});


const lion = xmlion('xml', {}, []);
    
test('add attribute', (assert) => {
    
    lion.addAttribute('attr','add');
    
    let actual = lion.value();
    
    assert.equal(actual, '<xml attr="add"/>', 'xmlion must add attribute');
    
    assert.end();
});

test('remove attribute', (assert) => {
    
    lion.removeAttribute('attr');
    
    let actual = lion.value();
    
    assert.equal(actual, '<xml/>', 'xmlion must remove attribute');
    
    assert.end();
});

test('add many attributes', (assert) => {
    
    lion.addAttributes({
        'attr1':'yup',
        'attr2':'yo'
    });
    
    let actual = lion.value();
    
    assert.equal(actual, '<xml attr1="yup" attr2="yo"/>', 'xmlion must add multiple attributes');
    
    assert.end();
});