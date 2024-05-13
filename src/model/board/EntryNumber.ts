import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { BoardRow } from "./BoardRow";
import { BoardCol } from "./BoardCol";
import { BoardNRow } from "./BoardNRow";
import { BoardNCol } from "./BoardNCol";

interface EntryNumberProps{
    value: string;
    boardRowPos: BoardRow;
    boardColPos: BoardCol;
    boardNRow: BoardNRow;
    boardNCol: BoardNCol;
}

export class EntryNumber extends ValueObject<EntryNumberProps>{
    get value (): string{
        return this.props.value;
    }
    get boardRowPos (): BoardRow{
        return this.props.boardRowPos;
    }
    get boardColPos (): BoardCol{
        return this.props.boardColPos;
    }
    get boardNRow (): BoardNRow{
        return this.props.boardNRow;
    }
    get boardNCol (): BoardNCol{
        return this.props.boardNCol;
    }
    
    private constructor(props: EntryNumberProps){
        super(props);
    }

    public static create (value: string,  
                        boardRowPos: BoardRow,
                        boardColPos: BoardCol, 
                        boardNRow: BoardNRow, 
                        boardNCol: BoardNCol): Result<EntryNumber>{

        const resultV = Guard.againstNullOrUndefined(value, ' value')
    
        if (!resultV.succeeded) {
            return Result.fail<EntryNumber>(resultV.message);
        } 
        const resultRP = Guard.againstNullOrUndefined(boardRowPos, ' boardRowPos')
    
        if (!resultRP.succeeded) {
            return Result.fail<EntryNumber>(resultRP.message);
        }

        const resultCP = Guard.againstNullOrUndefined(boardColPos, ' boardColPos')
    
        if (!resultCP.succeeded) {
            return Result.fail<EntryNumber>(resultCP.message);
        } 

        const resultNR = Guard.againstNullOrUndefined(boardNRow, ' boardNRow')
    
        if (!resultNR.succeeded) {
            return Result.fail<EntryNumber>(resultNR.message);
        }

        const resultNC = Guard.againstNullOrUndefined(boardNCol, ' boardNCol')
    
        if (!resultNC.succeeded) {
            return Result.fail<EntryNumber>(resultNC.message);
        } 

        return Result.ok<EntryNumber>(new EntryNumber({value: value, boardRowPos: boardRowPos, boardColPos: boardColPos, boardNRow: boardNRow, boardNCol: boardNCol}))
    }
}