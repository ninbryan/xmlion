import xmlion from './index';
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