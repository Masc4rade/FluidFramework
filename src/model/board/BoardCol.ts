import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { BoardNCol } from "./BoardNCol";

interface BoardColProps{
    value: string;
    numberCol: BoardNCol;
}

export class BoardCol extends AggregateRoot<BoardColProps>{
    get value(): string{
        return this.props.value;
    }

    get numberCol(): BoardNCol{
        return this.props.numberCol;
    }

    set value(value: string){
        this.props.value = value;
    }

    set numberCol(value: BoardNCol){
        this.props.numberCol = value;
    }

    private constructor (props: BoardColProps){
        super(props);
    }

    public static create (props: BoardColProps): Result<BoardCol>{
        const guardedProps =[
            {argument: props.value, argumentName: 'value'},
            {argument: props.numberCol, argumentName: 'numberColumns'}
        ]

        const result = Guard.againstNullOrUndefinedBulk(guardedProps);

        if(!result.succeeded){
            return Result.fail<BoardCol>(result.message)
        }

        const column = new BoardCol({
            ...props
        })

        return Result.ok<BoardCol>(column);
    }
}