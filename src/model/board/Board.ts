import { ValueObject } from "../../core/domain/ValueObject";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { BoardNRow } from "./BoardNRow";
import { BoardNCol } from "./BoardNCol";
import { User } from "../User/User";
import { BoardTitle } from "./BoardTitle";
import { BoardEntry } from "./BoardEntry";
import { BoardPermission } from "./BoardPermission";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { BoardId } from "../id/BoardID";

interface BoardProps{
    boardOwner: User;
    boardTitle: BoardTitle;
    boardEntries: Array<BoardEntry>;
    boardNRow: BoardNRow;
    boardNCol: BoardNCol;
    boardPermissions: Array<BoardPermission>;
}

export class Board extends AggregateRoot<BoardProps>{
    get id(): UniqueEntityID{
        return this._id;
    }
    get boardId (): BoardId{
        return new BoardId(this.id.toString())
    }
    get boardOwner (): User{
        return this.props.boardOwner;
    }
    get boardTitle (): BoardTitle{
        return this.props.boardTitle;
    }
    get boardEntries (): Array<BoardEntry>{
        return this.props.boardEntries;
    }
    get boardNRow (): BoardNRow{
        return this.props.boardNRow;
    }
    get boardNCol (): BoardNCol{
        return this.props.boardNCol;
    }
    get boardPermissions (): Array<BoardPermission>{
        return this.props.boardPermissions;
    }
    
    private constructor(props: BoardProps, id?: UniqueEntityID){
        super(props);
    }

    public static create (props: BoardProps, id?: UniqueEntityID): Result<Board>{

        const guardedProps = [
            { argument: props.boardEntries, argumentName: 'boardEntries'},
            { argument: props.boardNCol, argumentName: 'boardNCol'},
            { argument: props.boardNRow, argumentName: 'boardNRow'},
            { argument: props.boardOwner, argumentName: 'boardOwner'},
            { argument: props.boardTitle, argumentName: 'boardTitle'}
        ]
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps)
        if (!guardResult.succeeded) {
            return Result.fail<Board>(guardResult.message);
        }else{
            const board = new Board({...props}, id)
            return Result.ok<Board>(board)
        }
    }
}