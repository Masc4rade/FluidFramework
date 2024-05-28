import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface BoardNRowProps{
    value: number;
}

export class BoardNRow extends ValueObject<BoardNRowProps>{
    get value (): number{
        return this.props.value;
    }

    private constructor(props: BoardNRowProps){
        super(props);
    }

    public static create (boardNRow: number): Result<BoardNRow>{
        const result = Guard.againstNullOrUndefined(BoardNRow, ' BoardNRow')
    
        if (!result.succeeded) {
            return Result.fail<BoardNRow>(result.message);
        } 
      
        if (boardNRow < 1) {
            return Result.fail<BoardNRow>('Number of rows must be a positive number');
        }

        return Result.ok<BoardNRow>(new BoardNRow({value: boardNRow}))
    }
}