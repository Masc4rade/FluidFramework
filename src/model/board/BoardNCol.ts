import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface BoardNColProps{
    value: number;
}

export class BoardNCol extends ValueObject<BoardNColProps>{
    get value (): number{
        return this.props.value;
    }

    private constructor(props: BoardNColProps){
        super(props);
    }

    public static create (boardNCol: number): Result<BoardNCol>{
        const result = Guard.againstNullOrUndefined(BoardNCol, ' BoardNCol')
    
        if (!result.succeeded) {
            return Result.fail<BoardNCol>(result.message);
        } 
      
        if (boardNCol < 1) {
            return Result.fail<BoardNCol>('Number of columns must be a positive number');
        }

        return Result.ok<BoardNCol>(new BoardNCol({value: boardNCol}))
    }
}