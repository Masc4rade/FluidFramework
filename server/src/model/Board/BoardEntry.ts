import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { BoardRow } from "./BoardRow";
import { BoardCol } from "./BoardCol";
import { AggregateRoot } from "../../core/domain/AggregateRoot";

interface BoardEntryProps {
    boardRowPos: BoardRow;
    boardColPos: BoardCol;
    content: string; 
}

export class BoardEntry extends AggregateRoot<BoardEntryProps>{

    constructor(props: BoardEntryProps) {
        super(props)
    }

    get column(): BoardCol{
        return this.props.boardColPos
    }
    get row(): BoardRow{
        return this.props.boardRowPos
    }
    get content(): string{
        return this.props.content
    }
    set content(content: string){
        this.props.content = content
    }
    
    public static async create(boardRowPos: BoardRow, boardColPos: BoardCol, content: string): Promise<Result<BoardEntry>> {
        const resultRP = Guard.againstNullOrUndefined(boardRowPos, 'boardRowPos');
        if (!resultRP.succeeded) {
            return Result.fail<BoardEntry>(resultRP.message);
        }

        const resultCP = Guard.againstNullOrUndefined(boardColPos, 'boardColPos');
        if (!resultCP.succeeded) {
            return Result.fail<BoardEntry>(resultCP.message);
        }
        const props: BoardEntryProps = { boardRowPos, boardColPos, content };
        return Result.ok<BoardEntry>(new BoardEntry(props));
    }
}