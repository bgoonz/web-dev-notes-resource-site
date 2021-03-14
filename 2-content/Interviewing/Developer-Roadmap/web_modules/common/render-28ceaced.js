import{m as t,T as e,r as s,N as n}from"./lit-html-b5eeea4b.js";
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function r(s){let n=a.get(s.type);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},a.set(s.type,n));let r=n.stringsArray.get(s.strings);if(void 0!==r)return r;const i=s.strings.join(t);return r=n.keyString.get(i),void 0===r&&(r=new e(s,s.getTemplateElement()),n.keyString.set(i,r)),n.stringsArray.set(s.strings,r),r}const a=new Map,i=new WeakMap,g=(t,e,a)=>{let g=i.get(e);void 0===g&&(s(e,e.firstChild),i.set(e,g=new n(Object.assign({templateFactory:r},a))),g.appendInto(e)),g.setValue(t),g.commit()};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */export{i as p,g as r,a as t};
//# sourceMappingURL=render-28ceaced.js.map
