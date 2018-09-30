import { getNodePath, findNodeByEq } from './get-node-path';
import { NodePath } from './preboot.interfaces';

describe('UNIT TEST get-node-path', function() {
  document.body.innerHTML = `
    <div id="parent">
      <span class="child">
        <p>123</p>
      </span>
    </div>
  `;

  it('should generate a nodePath', function() {
    const node = document.querySelector('p');
    const actual = getNodePath(node!);
    const expected: NodePath = {
      tagName: 'SPAN',
      eq: [1, 0],
      className: 'child',
    };
    expect(actual).toEqual(expected);
  });
});

describe('UNIT TEST find Node by eq', function() {
  document.body.innerHTML = `
    <div id="parent">
      <span class="child">
        <p>123</p>
      </span>
    </div>
  `;

  it('should find a node', function() {
    const nodePath = {
      tagName: 'SPAN',
      eq: [1, 0],
      className: 'child',
    };
    const { tagName, eq } = nodePath;
    const className = nodePath.className.split(' ').join('.');
    const nodes = document.body.querySelectorAll(`${tagName}.${className}`);
    const actual = findNodeByEq(nodes, eq) as HTMLElement;
    const expected = document.querySelector('p')!;
    expect(actual).toEqual(expected);
  });
});

