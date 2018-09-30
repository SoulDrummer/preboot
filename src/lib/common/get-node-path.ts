/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NodePath, ClassNameRst } from './preboot.interfaces';

export function findNodeByEq(nodes: NodeList, eq: number[]): Node | null {
  let index = eq.pop();
  let node: Node | null = nodes.item(index!);
  while (node && index !== undefined) {
    index = eq.pop();
    const temp: Node | null = node.childNodes.item(index!);
    if (temp && temp instanceof HTMLElement
      || temp instanceof SVGSVGElement
      || temp instanceof SVGPathElement
      || temp instanceof SVGGElement) {
      node = temp;
    } else {
      return node;
    }
  }
  return node;
}

export function getNodePath(node: Element, nodePath: NodePath = {}): NodePath {
  const tagName = node.tagName;
  nodePath.tagName = tagName;
  nodePath.eq = nodePath.eq || [];

  if (node instanceof HTMLElement
    || node instanceof SVGSVGElement
    || node instanceof SVGPathElement
    || node instanceof SVGGElement) {
    if (node.id) {
      const nodes = document.querySelectorAll(`${tagName}#${node.id}`);
      const len = nodes.length;
      for (let i = 0; i < len; i++) {
        if (nodes.item(i) === node) {
          nodePath.id = node.id;
          nodePath.eq.push(i);
          break;
        }
      }
    } else if (node.classList.length > 0 && node instanceof HTMLElement) {
      const classList = Array.from(node.classList);
      const findResult = findByClassName(tagName, classList, node);
      nodePath.className = findResult.className || '';
      nodePath.eq.push(findResult.eq || 0);
    } else if (node.parentNode
        && node.parentNode instanceof HTMLElement
        || node.parentNode instanceof SVGSVGElement
        || node.parentNode instanceof SVGPathElement
        || node.parentNode instanceof SVGGElement) {
      const nodes = node.parentNode.childNodes;
      const len = nodes.length;
      for (let i = 0; i < len; i++) {
        if (nodes.item(i) === node) {
          nodePath.eq.push(i);
          break;
        }
      }
      getNodePath(node.parentNode, nodePath);
    }
  }

  return nodePath;
}

function findByClassName(tagName: string, classList: string[], node: HTMLElement): ClassNameRst {
  const classNameRst: ClassNameRst = {} as ClassNameRst;
  if (classList.length > 0) {
    let className = classList.join('.');
    const nodes = document.querySelectorAll(`${tagName}.${className}`);
    if (nodes.length === 1 && classList.length > 1) {
      classList.pop();
      className = classList.join('.');
      return findByClassName(tagName, classList, node);
    } else {
      const len = nodes.length;
      for (let i = 0; i < len; i++) {
        if (nodes.item(i) === node) {
          classNameRst.eq = i;
          classNameRst.className = classList.join(' ');
          break;
        }
      }
    }
  }

  return classNameRst;
}
