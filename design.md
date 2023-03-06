## Modules (imports/exports)

### Ordering imports
 - React, other high-level frameworks first
 - MantineUI components and packages
 - Other external libraries and packages
 - Project based modules in alphabetical order
 - Component specific styles, should be in local directory
 - Children components in order of appearance, from local directory outward
 - Types and class definitions

### Exports
 #### Components
  - Use index.ts file in root directory of component to handle clean module import/export
  - Declare and define component with arrow function.
  - Export named component as default at bottom of file.
 #### Hooks
  - Define and export named hook using `function()` declaration.
