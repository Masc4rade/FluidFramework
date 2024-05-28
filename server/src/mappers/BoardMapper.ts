import { Mapper } from "../core/infra/Mapper";

import {IBoardDTO} from "../dto/IBoardDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Board } from "../model/Board/Board";


export class BoardMap extends Mapper<Board> {

  public static toDTO( board: Board): IBoardDTO {
    return {
        boardOwner: board.boardOwner.name,
        boardTitle: board.boardTitle.value,
        boardEntries: board.boardEntries.values(),
        boardNRow: board.boardNRow.value,
        boardNCol: board.boardNCol.value,
        boardPermissions: board.boardPermissions.values()
    } as unknown as IBoardDTO;
  }

  public static async toDomain (raw: any): Promise<Board> {

    const boardOrError = Board.create({
        boardOwner: raw.boardOwner,
        boardTitle: raw.boardTitle,
        boardEntries: raw.boardEntries,
        boardNRow: raw.boardNRow,
        boardNCol: raw.boardNCol,
        boardPermissions: raw.boardPermissions
    }, new UniqueEntityID(raw.domainId))

    boardOrError.isFailure ? console.log(boardOrError.error) : '';

    return boardOrError.getValue();
  }

  public static toPersistence (board: Board): any {
    const a = {
        boardOwner: board.boardOwner,
        boardTitle: board.boardTitle,
        boardEntries: board.boardEntries,
        boardNRow: board.boardNRow,
        boardNCol: board.boardNCol,
        boardPermissions: board.boardPermissions
    }
    return a;
  }
}
