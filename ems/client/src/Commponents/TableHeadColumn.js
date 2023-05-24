import React from 'react'
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'


export default function TableHeadColumn({
    id, label, handleSort, sortOrder, sortBy
}) {
    return (
        <th className="th-lg" onClick={() => handleSort(id)}>
            {label}
            {sortBy === id && (sortOrder === 'asc' ? <TiArrowSortedDown /> : <TiArrowSortedUp />)}
        </th>
    )
}
