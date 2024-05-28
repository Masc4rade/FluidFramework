import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { BoardNRow } from "./BoardNRow";

interface BoardRowProps{
    value: string;
    numberRow: BoardNRow;
}

export class BoardRow extends AggregateRoot<BoardRowProps>{
    get value(): string{
        return this.props.value;
    }

    get numberRow(): BoardNRow{
        return this.props.numberRow;
    }

    set value(value: string){
        this.props.value = value;
    }

    set numberRow(value: BoardNRow){
        this.props.numberRow = value;
    }

    private constructor (props: BoardRowProps){
        super(props);
    }

    public static create (props: BoardRowProps): Result<BoardRow>{
        const guardedProps =[
            {argument: props.value, argumentName: 'value'},
            {argument: props.numberRow, argumentName: 'numberRow'}
        ]

        const result = Guard.againstNullOrUndefinedBulk(guardedProps);

        if(!result.succeeded){
            return Result.fail<BoardRow>(result.message)
        }

        const row = new BoardRow({
            ...props
        })

        return Result.ok<BoardRow>(row);
    }
}