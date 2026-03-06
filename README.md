# @nunocunha/ng-ag-grid-column

Angular property decorator for simplified [AG Grid](https://www.ag-grid.com/) column definitions, with automatic header translation via [ngx-translate](https://github.com/ngx-translate/core).

## Installation

```bash
npm install @nunocunha/ng-ag-grid-column
```

This package requires the following peer dependencies:

```bash
npm install ag-grid-community ag-grid-angular @ngx-translate/core reflect-metadata rxjs
```

You also need `reflect-metadata` imported once at your app entry point (e.g. `main.ts`):

```ts
import 'reflect-metadata';
```

And `emitDecoratorMetadata` + `experimentalDecorators` enabled in your `tsconfig`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Since `reflect-metadata` ships as CommonJS, Angular build will warn about it unless you allowlist it. Add it to your app build options in `angular.json`:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "allowedCommonJsDependencies": ["reflect-metadata"]
          }
        }
      }
    }
  }
}
```

## Usage

### 1. Decorate your model class

Use `@AgGridColumn` on each property that should become a grid column. Pass any `ColDef` option (except `field`, which is derived from the property name automatically).

```ts
import { AgGridColumn } from '@nunocunha/ng-ag-grid-column';

export class Product {
  @AgGridColumn({ headerName: 'product.name', sortable: true })
  name!: string;

  @AgGridColumn({ headerName: 'product.price', sortable: true, filter: 'agNumberColumnFilter' })
  price!: number;

  @AgGridColumn({ headerName: 'product.stock' })
  stock!: number;
}
```

### 2. Generate column definitions with `generateColumnDefsFrom`

`generateColumnDefsFrom` reads the decorator metadata and streams translated `ColDef[]` using `TranslateService.stream`, so the columns react automatically to language changes.

```ts
import { Component } from '@angular/core';
import { generateColumnDefsFrom } from '@nunocunha/ng-ag-grid-column';
import { Product } from './product.model';

@Component({ /* ... */ })
export class ProductListComponent {
  readonly columnDefs$ = generateColumnDefsFrom(Product);
}
```

`generateColumnDefsFrom` uses `inject()` internally, so it must be called from an [injection context](https://angular.dev/guide/di/dependency-injection-context), typically a field initializer or constructor, as shown above. If you need to call it elsewhere, wrap the call in `runInInjectionContext`.

Then, simply use it on the HTML template as a regular "columnDefs" input value:

```html
<ag-grid-angular
  [columnDefs]="columnDefs$ | async"
  [rowData]="rows$ | async"
/>
```

## API

### `AgGridColumn(meta?)`

Property decorator. `meta` accepts any [`ColDef`](https://www.ag-grid.com/angular-data-grid/column-properties/) option, _except_ `field`.

### `generateColumnDefsFrom(modelClass)`

Returns `Observable<ColDef[]>`. Re-emits whenever the active translation language changes. Must be called from an Angular injection context.

| Parameter    | Type                          | Description                              |
|--------------|-------------------------------|------------------------------------------|
| `modelClass` | `abstract new (...) => TData` | The class decorated with `@AgGridColumn` |

### `AgGridColumnInput<TData, TValue>`

Type alias for `Omit<ColDef<TData, TValue>, 'field'>`. The type of the optional `meta` argument passed to `@AgGridColumn`.

## Versioning

This package doesn't follow _[semver](https://semver.org/)_, although it is similar. For any version `X.Y.Z`:

- `X` is the major Angular version.
- `Y` is the major AG Grid version.
- `Z` is this package internal version.

The reasoning for this is that if Angular or AG Grid versions change, it probably will break something, so it's safer to assume that breakage and only have a "patch" version for the dependency pair.

## License

[MIT](LICENSE)
