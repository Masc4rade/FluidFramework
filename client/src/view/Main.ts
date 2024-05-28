import { IFluidContainer, ISharedMap, SharedMap } from "fluid-framework";
import { AzureMember } from "@fluidframework/azure-client";
import { Board } from "../model/Board/Board";
import UserRepo from "../repos/UserRepo";

export type model = Readonly<{
    createBoard(author: AzureMember, nRow: number, nCol: number, title: string): Board;
    changeContent(board: Board, nCol: number, nRow: number, content: string): void;
    setChangeListener(listener: () => void) : void;
    removeChangeListener(listener: ()=> void): void;
}>;
/*
export function createBoardEntry(fluid: IFluidContainer): model{
    const sharedMap: ISharedMap = fluid.initialObjects.map as SharedMap;
    
    return{
        createBoard(author: AzureMember, nRow: number, nCol: number, title: string): Board{
            
            get
            
            return 
        }
    }
}
*/