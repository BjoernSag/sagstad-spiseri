import React from "react"
import renderer from "react-test-renderer"
import Index from '../pages/index.js'
const { sortArrayOfObjects} = require('../pages/index');

test('sort an array of object return sorted', () => {

    const arra = [];
    var node = {node: {title:'kjott', sub:'kansje'}};
    arra.push(node);
    node = {node: {title:'andre', sub:'snop'}};
    arra.push(node);
    node = {node: {title:'fisk', sub:'ikkke'}};
    arra.push(node);
    const sorted = sortArrayOfObjects(arra);
    console.log(<Index resetFilters={resetFilters()} />);
    expect(sorted[0].node.title).toBe('andre');
});
