import { Repo } from "../../core/infra/Repo";
import { Board } from "../../model/Board/Board";

export default interface IBoardRepo extends Repo<Board> {
	save(board: Board): Promise<Board>;
	findById (id: string): Promise<Board | null>;
}
  