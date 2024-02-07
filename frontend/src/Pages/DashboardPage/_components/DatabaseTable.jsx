import React, { useState, useEffect } from 'react';
import { Skeleton } from '@mui/material';
import DatabaseModifierButton from './DatabaseModifierButton';
import {
    useReactTable,
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';

const TableComponent = ({ headers, data, modifierButtons, isLoading }) => {
    const [globalFilter, setGlobalFilter] = useState("");
    const columnHelper = createColumnHelper();
    const [columnResizeMode, setColumnResizeMode] = useState('onChange')
    const [columnResizeDirection, setColumnResizeDirection] = useState('ltr')
    const [rowSelection, setRowSelection] = useState({})

    const columns = [
        {
            id: 'select',
            header: ({ table }) => (
                <IndeterminateCheckbox
                    {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                />
            ),
            cell: ({ row }) => (
                <div className="px-1 text-center">
                    <IndeterminateCheckbox
                        {...{
                            checked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler(),
                        }}
                    />
                </div>
            ),
        },
        ...headers.map((name, index) => ({
            ...columnHelper.accessor(name, {
                cell: (item) => (
                    <span className='text-sm'>
                        {String(item.getValue()).length > 20 ? String(item.getValue()).slice(0, 20) + '...' : String(item.getValue())}
                    </span>
                ),
                header: name,
                enableResizing: true,
                minSize: 50,
                maxSize: 500
            }),
        })),
        columnHelper.accessor('Modifier', {
            id: 'Modifier',
            cell: ({ row }) => (
                <div className='flex gap-2 text-[#fff]'>
                    {modifierButtons.map((item, index) => (
                        <DatabaseModifierButton key={index} rowData={row.original} {...item}/>
                    ))}
                </div>
            ),
            header: () => <span>MODIFIER</span>,
            footer: info => info.column.id,
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            rowSelection
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode,
        columnResizeDirection,
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
        initialState: {
            pagination: {
                pageSize: 15
            }
        }
    });

    useEffect(() => {
        console.log(rowSelection);
        console.log(data);
    }, [rowSelection]);

    useEffect(() => {
        console.log(isLoading);
    }, [isLoading]);

    return (
        <div className='w-full flex flex-col items-center gap-5 overflow-x-auto'>
            <div className='w-fit p-4 bg-[#202020]'>
                <table className="w-full" {...{
                    style: {
                        width: table.getCenterTotalSize(),
                    },
                }}>
                    <thead>
                        {
                            table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map((header) => (
                                            <th {...{
                                                key: header.id,
                                                colSpan: header.colSpan,
                                                style: {
                                                    width: header.getSize(),
                                                },
                                            }}
                                                className='p-2 border '
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                <div
                                                    {...{
                                                        onDoubleClick: () => header.column.resetSize(),
                                                        onMouseDown: header.getResizeHandler(),
                                                        onTouchStart: header.getResizeHandler(),
                                                        className: `resizer ${table.options.columnResizeDirection
                                                            } ${header.column.getIsResizing() ? 'isResizing' : ''
                                                            }`,
                                                        style: {
                                                            transform:
                                                                columnResizeMode === 'onEnd' &&
                                                                    header.column.getIsResizing()
                                                                    ? `translateX(${(table.options.columnResizeDirection ===
                                                                        'rtl'
                                                                        ? -1
                                                                        : 1) *
                                                                    (table.getState().columnSizingInfo
                                                                        .deltaOffset ?? 0)
                                                                    }px)`
                                                                    : '',
                                                        },
                                                    }}
                                                />
                                            </th>

                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody>
                        {!isLoading || isLoading !== undefined ? (
                            table.getRowModel().rows.map((row, i) => (
                                <tr key={row.id} className={`${i % 2 === 0 ? null : 'bg-[#191919]'} text-sm hover:bg-[#191919]`}>
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            {...{
                                                key: cell.id,
                                                style: {
                                                    width: cell.column.getSize(),
                                                },
                                            }}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            table.getRowModel().rows.map((row, i) => (
                                <tr
                                    key={row.id}
                                    className={`${i % 2 === 0 ? null : "bg-[#191919]"}`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className=" text-sm">
                                            <Skeleton animation="wave" height={25} />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                        {!isLoading && table.getRowModel().rows.length === 0 &&
                            <tr className="text-center h-32">
                                <td colSpan={12}>No Recoard Found!</td>
                            </tr>
                        }
                    </tbody>
                </table>

            </div>
            <div className="flex items-center justify-center mt-2 gap-2">
                <button
                    onClick={() => {
                        table.previousPage();
                    }}
                    disabled={!table.getCanPreviousPage()}
                    className="p-1 border border-gray-300 px-2 disabled:opacity-30"
                >
                    {"<"}
                </button>
                <button
                    onClick={() => {
                        table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
                    className="p-1 border border-gray-300 px-2 disabled:opacity-30"
                >
                    {">"}
                </button>

                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                    className="p-2 bg-PrimaryColors text-PrimaryBG cursor-pointer border-1"
                >
                    {[15, 30, 45, 60].map((pageSize) => (
                        <option className='bg-[transparent]' key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>

    )
};

export default TableComponent;

function IndeterminateCheckbox({ indeterminate, className = '', ...rest }) {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer h-5 w-5 accent-PrimaryColors'}
            {...rest}
        />
    );
}
