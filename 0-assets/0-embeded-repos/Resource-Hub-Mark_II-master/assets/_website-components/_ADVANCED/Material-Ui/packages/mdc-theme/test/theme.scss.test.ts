

import * as fs from 'fs';
import * as path from 'path';

describe('theme.test.scss', () => {
  it('should transform theme keys to custom property for theme.property()',
     () => {
       const filePath = path.join(__dirname, 'theme.test.css');
       const css = fs.readFileSync(filePath, 'utf8').trim();
       expect(css).toEqual(`.test {
  color: #6200ee;
  /* @alternate */
  color: var(--mdc-theme-primary, #6200ee);
}`);
     });

  it('host-aware test produces expected output',
     () => {
       const filePath = path.join(__dirname, 'shadow-dom.test.css');
       const css = fs.readFileSync(filePath, 'utf8').trim();
       expect(css).toEqual(`:host([lowered]), :host(:not(.hidden)[outlined][lowered]), :host .my-class[lowered], gm-fab[lowered] {
  color: blue;
}
:host([lowered]:hover), :host(:not(.hidden)[outlined][lowered]:hover), :host .my-class[lowered]:hover, gm-fab[lowered]:hover {
  background-color: red;
}

:host(:focus), :host(:not(.hidden)[outlined]:focus), :host .my-class:focus, gm-fab:focus, :host, :host(:not(.hidden)[outlined]), :host .my-class, gm-fab {
  border-color: green;
}`);
     });

  it('should replace values provided to $replace for theme.property()', () => {
    const filePath = path.join(__dirname, 'replace.test.css');
    const css = fs.readFileSync(filePath, 'utf8').trim();
    expect(css).toEqual(`.simple {
  width: calc(100% - 20px);
}

.var {
  width: calc(16px + 8px);
  /* @alternate */
  width: calc(var(--m-foo, 16px) + var(--m-bar, 8px));
}

.multiple {
  width: calc(8px + 8px + 8px);
}`);
  });

  it('should allow overriding theme color values using @use/with', () => {
    const filePath = path.join(__dirname, 'override.test.css');
    const css = fs.readFileSync(filePath, 'utf8').trim();
    expect(css).toContain('--mdc-theme-primary: teal');
    expect(css).toContain('--mdc-theme-secondary: crimson');
  });

  it('validate-keys Should throw error when unsupported key is provided',
     () => {
       const filePath = path.join(__dirname, 'theme-validate-keys.test.css');
       const css = fs.readFileSync(filePath, 'utf8').trim();
       expect(css).toContain('Unsupported keys found: foobar.');
     });
});
