import { Result } from "../../core/logic/Result";
import { IBoardDTO } from "../../dto/IBoardDTO";
import { Board } from "../../model/Board/Board";
import { BoardEntry } from "../../model/Board/BoardEntry";
import { User } from "../../model/User/User";

export default interface IBoardService {
    createBoard(boardDTO: IBoardDTO): Promise<Result<{boardDTO: IBoardDTO}>>,
   // updateBoard(user: User, boardID: string, entry: BoardEntry, content: string): Promise<Result<{boardDTO: IBoardDTO}>>;
}