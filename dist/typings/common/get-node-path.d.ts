/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NodePath } from './preboot.interfaces';
export declare function findNodeByEq(nodes: NodeList, eq: number[]): Node | null;
export declare function getNodePath(node: Element, nodePath?: NodePath): NodePath;
