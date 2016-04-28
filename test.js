import xmlion from './src/index';
import test from 'tape';

test('empty elements', (assert) => {
    let actual = xmlion('lion').value();
    
    assert.equal(actual, '<lion/>', 'xmlion must make empty elements');
    
    assert.end();
});

test('attributed elements', (assert) => {
    let actual = xmlion('lion', {attr:'test'}).value();
    
    assert.equal(actual, '<lion attr="test"/>', 'xmlion must make attributed elements');
    
    assert.end();
});

test('attributed elements with content', (assert) => {
    let actual = xmlion('lion', {attr:'test'}, ['test']).value();
    
    assert.equal(actual, '<lion attr="test">test</lion>', 'xmlion must make attributed elements with content');
    
    assert.end();
});

test('attributed elements with two cubs', (assert) => {
    let actual = xmlion('lion', {attr:'test'}, ['test',xmlion('lion', {attr:'test'}, ['test'])]).value();
    
    assert.equal(actual, '<lion attr="test">test<lion attr="test">test</lion></lion>', 'xmlion must make complex attributed elements with content');
    
    assert.end();
});

test('attributed elements with empty values', (assert) => {
    let actual = xmlion('lion', {attr:'test'}, [null,undefined,NaN,0]).value();
    
    assert.equal(actual, '<lion attr="test">NaN0</lion>', 'xmlion must make complex attributed elements with content');
    
    assert.end();
});


const lion = xmlion('lion', {}, []);
    
test('add attribute', (assert) => {
    
    lion.addAttribute('attr','add');
    
    let actual = lion.value();
    
    assert.equal(actual, '<lion attr="add"/>', 'xmlion must add attribute');
    
    assert.end();
});

test('remove attribute', (assert) => {
    
    lion.removeAttribute('attr');
    
    let actual = lion.value();
    
    assert.equal(actual, '<lion/>', 'xmlion must remove attribute');
    
    assert.end();
});

test('add many attributes', (assert) => {
    
    lion.addAttributes({
        'attr1':'yup',
        'attr2':'yo'
    });
    
    let actual = lion.value();
    
    assert.equal(actual, '<lion attr1="yup" attr2="yo"/>', 'xmlion must add multiple attributes');
    
    assert.end();
});

const cub = xmlion('cub');

test('add cub', (assert) => {
    
    lion.addCub(cub);
    
    let actual = lion.value();
    
    assert.equal(actual, '<lion attr1="yup" attr2="yo"><cub/></lion>', 'xmlion must add a cub');
    
    assert.end();
});

test('remove cub', (assert) => {
    
    lion.removeCub(cub);
    
    let actual = lion.value();
    
    assert.equal(actual, '<lion attr1="yup" attr2="yo"/>', 'xmlion must remove a cub');
    
    assert.end();
});

test('add cubs', (assert) => {
    
    lion.addCubs([cub, xmlion('cub', null, ['meow'])]);
    
    let actual = lion.value();
    
    assert.equal(actual, '<lion attr1="yup" attr2="yo"><cub/><cub>meow</cub></lion>', 'xmlion must add many cubs');
    
    assert.end();
});

test('remove all cubs', (assert) => {
    
    lion.removeAllCubs();
    
    let actual = lion.value();
    
    assert.equal(actual, '<lion attr1="yup" attr2="yo"/>', 'xmlion must add a cub');
    
    assert.end();
});