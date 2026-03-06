import 'reflect-metadata';
import type {ColDef, ColDefField} from 'ag-grid-community';
import {type AgGridColumnMeta} from './ag-grid-column-meta';
import {type AgGridColumnInput} from './ag-grid-column-input';
import {AG_GRID_COLUMN_METADATA_KEY} from './ag-grid-column-metadata-key';

/**
 * Decorator that creates metadata for class fields that are to be used on AG Grid as columns.
 *
 * @param meta Metadata object, same as {@link ColDef} without the `field` property.
 * @constructor
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function AgGridColumn<TData extends object = object, TValue = unknown>(meta?: AgGridColumnInput<TData, TValue>) {
    return function (target: TData, propertyKey: ColDefField<TData, TValue>): void {
        const proto: object = target as object;
        const columns = (Reflect.getMetadata(AG_GRID_COLUMN_METADATA_KEY, proto) ?? []) as Array<
            AgGridColumnMeta<TData, TValue>
        >;

        const entry: AgGridColumnMeta<TData, TValue> = {...meta, field: propertyKey};
        columns.push(entry);

        Reflect.defineMetadata(AG_GRID_COLUMN_METADATA_KEY, columns, proto);
    };
}
