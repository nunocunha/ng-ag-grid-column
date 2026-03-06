import {inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import type {ColDef} from 'ag-grid-community';
import {map, Observable} from 'rxjs';
import {AG_GRID_COLUMN_METADATA_KEY} from './ag-grid-column-metadata-key';
import {AgGridColumnMeta} from './ag-grid-column-meta';

/**
 * Generates all column definitions for an AG Grid from a class that uses the <code>@{@link AgGridColumn}</code> annotation.
 *
 * @param modelClass The class to extract <code>{@link ColDef}[]</code> from
 *                   <code>@{@link AgGridColumn}</code> annotated fields.
 *
 * @throws Error `NG0203` if called from outside an injection context.
 *
 * @example
 * ```ts
 * class User {
 *   @AgGridColumn firstName: string = "...";
 * }
 *
 * const columnDefs = generateColumnDefsFrom(User);
 * ```
 */
export function generateColumnDefsFrom<TData extends object = object, TValue = unknown>(
    modelClass: abstract new (...args: never) => TData
): Observable<Array<ColDef<TData, TValue>>> {
    const translateService = inject(TranslateService);

    const proto = modelClass.prototype as object;
    const columns = (Reflect.getMetadata(AG_GRID_COLUMN_METADATA_KEY, proto) ?? []) as Array<
        AgGridColumnMeta<TData, TValue>
    >;

    const keys = columns.map((column) => column.headerName ?? column.field);

    return translateService.stream(keys).pipe(
        map((translations: Record<string, string>) =>
            columns.map(({headerName, ...rest}) => ({
                ...rest,
                headerName: translations[headerName ?? ''] ?? headerName ?? rest.field,
            }))
        )
    );
}
