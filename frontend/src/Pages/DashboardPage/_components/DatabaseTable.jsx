import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from '@tremor/react';
import { Skeleton } from '@mui/material';
import DatabaseModifierButton from './DatabaseModifierButton';

const TableComponent = ({ headers, data, modifierButtons, isLoading }) => {
    return (
        <Table className='border border-PrimaryColors'>
            <TableHead>
                <TableRow>
                    {headers.map((item, index) => (
                        <TableHeaderCell className='text-PrimaryColors text-center' key={index}>
                            {item}
                        </TableHeaderCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {isLoading ? (
                    // Display loading skeletons when data is still being fetched
                    Array.from({ length: 10 }, (_, rowIndex) => (
                        <TableRow className={` ${rowIndex % 2 === 1 ? 'bg-[transparent]' : 'bg-[#202020]'} border-none !text-PrimaryColors hover:!text-InactivePrimary cursor-pointer`} key={rowIndex}>
                            {headers.map((header, cellIndex) => (
                                <TableCell key={cellIndex}>
                                    <Skeleton animation="wave" height={30} />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    // Display table rows when data is available
                    data.map((rowData, index) => (
                        <TableRow key={index} className={` ${index % 2 === 1 ? 'bg-[transparent]' : 'bg-[#202020]'} border-none !text-PrimaryColors hover:!text-InactivePrimary cursor-pointer`}>
                            {headers.slice(0, -1).map((header, cellIndex) => (
                                <TableCell key={cellIndex}>
                                    {typeof rowData[header] === 'string' && rowData[header].length > 15
                                        ? `${rowData[header].slice(0, 25)}...`
                                        : rowData[header]}
                                </TableCell>
                            ))}
                            <TableCell className='flex space-x-2 justify-center'>
                                {modifierButtons.slice(1).map((button, buttonIndex) => (
                                    <DatabaseModifierButton
                                        behavior={button.behavior}
                                        key={buttonIndex}
                                        {...button}
                                        rowData={rowData}
                                    />
                                ))}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
};

export default TableComponent;