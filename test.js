import {xmlion} from './dist/xmlion';
import test from 'ava';

test('empty elements', (assert) => {
  let actual = xmlion('lion').value();

  assert.is(actual, '<lion/>', 'xmlion must make empty elements');
});

test('attributed elements', (assert) => {
  let actual = xmlion('lion', {attr: 'test'}).value();

  assert.is(actual, '<lion attr="test"/>', 'xmlion must make attributed elements');
});

test('elements with undefined attributes', (assert) => {
  let actual = xmlion('lion', {attr: undefined}).value();

  assert.is(actual, '<lion attr/>', 'xmlion must make attributed elements');
});

test('elements with null attributes', (assert) => {
  let actual = xmlion('lion', {attr: null}).value();

  assert.is(actual, '<lion attr/>', 'xmlion must make attributed elements');
});

test('attributed elements with content', (assert) => {
  let actual = xmlion('lion', {attr: 'test'}, ['test']).value();

  assert.is(actual, '<lion attr="test">test</lion>', 'xmlion must make attributed elements with content');
});

test('attributed elements with two cubs', (assert) => {
  let actual = xmlion('lion', {attr: 'test'}, ['test', xmlion('lion', {attr: 'test'}, ['test'])]).value();

  assert.is(actual, '<lion attr="test">test<lion attr="test">test</lion></lion>', 'xmlion must make complex attributed elements with content');
});

test('attributed elements with empty values', (assert) => {
  let actual = xmlion('lion', {attr: 'test'}, [null, undefined, NaN, 0]).value();

  assert.is(actual, '<lion attr="test">NaN0</lion>', 'xmlion must make complex attributed elements with content');
});

const lion = xmlion('lion', {}, []);

test('add attribute', (assert) => {
  lion.addAttribute('attr', 'add');

  let actual = lion.value();

  assert.is(actual, '<lion attr="add"/>', 'xmlion must add attribute');
});

test('remove attribute', (assert) => {
  lion.removeAttribute('attr');

  let actual = lion.value();

  assert.is(actual, '<lion/>', 'xmlion must remove attribute');
});

test('add many attributes', (assert) => {
  lion.addAttributes({
    'attr1': 'yup',
    'attr2': 'yo'
  });

  let actual = lion.value();

  assert.is(actual, '<lion attr1="yup" attr2="yo"/>', 'xmlion must add multiple attributes');
});

const cub = xmlion('cub');

test('add cub', (assert) => {
  lion.addCub(cub);

  let actual = lion.value();

  assert.is(actual, '<lion attr1="yup" attr2="yo"><cub/></lion>', 'xmlion must add a cub');
});

test('remove cub', (assert) => {
  lion.removeCub(cub);

  let actual = lion.value();

  assert.is(actual, '<lion attr1="yup" attr2="yo"/>', 'xmlion must remove a cub');
});

test('add cubs', (assert) => {
  lion.addCubs([cub, xmlion('cub', null, ['meow'])]);

  let actual = lion.value();

  assert.is(actual, '<lion attr1="yup" attr2="yo"><cub/><cub>meow</cub></lion>', 'xmlion must add many cubs');
});

test('remove all cubs', (assert) => {
  lion.removeAllCubs();

  let actual = lion.value();

  assert.is(actual, '<lion attr1="yup" attr2="yo"/>', 'xmlion must add a cub');
});

test('set new cubs', (assert) => {
  lion.cubs = ['cub1', ' ', 'cub2'];

  let actual = lion.value();

  assert.is(actual, '<lion attr1="yup" attr2="yo">cub1 cub2</lion>', 'xmlion must set new cubs');
});

test('fail a set new cubs', (assert) => {
  let block = () => {
    lion.cubs = 'cub3';
  };

  let err = 'Lion wants cub[]';

  assert.throws(block, err, 'Fail to set cubs that is not Array');
});

test('get cubs', (assert) => {
  let cubs = ['cub1', 'cub7'];

  lion.cubs = cubs;

  assert.is(lion.cubs[1], cubs[1], 'last cub should be the same');

  assert.not(lion.cubs, cubs, 'variable is not the same');
});

test('setCubs', (assert) => {
  lion.setCubs(['cub3', 'cub5']);

  assert.is(lion.cubs[1], 'cub5', 'last cub should be cub5');
});

test('getCubs', (assert) => {
  assert.is(lion.getCubs()[0], 'cub3', 'first cub should be cub3');
});

test('setAttributes', (assert) => {
  const lion = xmlion('lion');

  lion.setAttributes({prideful: true});

  assert.is(lion.value(), '<lion prideful="true"/>', 'expected prideful lion');
});
