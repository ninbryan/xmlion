import xmlion from './src/xmlion';
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

test('set new cubs', (assert) => {
    
    lion.cubs = ['cub1', ' ', 'cub2'];
    
    let actual = lion.value();
    
    assert.equal(actual, '<lion attr1="yup" attr2="yo">cub1 cub2</lion>', 'xmlion must set new cubs');
    
    assert.end();
});


test('fail a set new cubs', (assert) => {
    
    let block = () => {
        lion.cubs = 'cub3';
    };
    
    let err = 'Lion wants cubs[]';
    
    assert.throws(block, err, 'Fail to set cubs that is not Array');
    
    assert.end();
});

test('get cubs', (assert) => {
    
    let cubs = ['cub1', 'cub7'];
    
    lion.cubs = cubs;
    
    assert.equal(lion.cubs[1], cubs[1], 'last cub should be the same');
    
    assert.notEqual(lion.cubs, cubs, 'variable is not the same');
    
    assert.end();
});

test('setCubs', (assert) => {
   
    lion.setCubs(['cub3','cub5']);
    
    assert.equal(lion.cubs[1], 'cub5', 'last cub should be cub5');
    
    assert.end();
});

test('getCubs', (assert) => {
   
    assert.equal(lion.getCubs()[0], 'cub3', 'last cub should be cub3');
    
    assert.end();
});