import { BoardEntry } from "../../../src/model/Board/BoardEntry";

export interface FluidDisplayObject{
    nCol: number;
    nRow: number;
    content: string;
}

export const Entry2Fluid = (entry: BoardEntry): FluidDisplayObject =>{
    return{
        nCol: entry.column.numberCol.value,
        nRow: entry.row.numberRow.value,
        content: entry.content
    }
}

export const Fluid2Entry = (
    entryUpdated: BoardEntry,
    sourceObject: FluidDisplayObject
    )=>{
        entryUpdated.content = sourceObject.content
        return entryUpdated
    }