import { Result } from "../core/logic/Result";
import { IBoardDTO } from "../dto/IBoardDTO";
import { AccessLevel } from "../model/Board/AccessLevel";
import { BoardEntry } from "../model/Board/BoardEntry";
import { BoardNCol } from "../model/Board/BoardNCol";
import { BoardNRow } from "../model/Board/BoardNRow";
import { BoardPermission } from "../model/Board/BoardPermission";
import { User } from "../model/User/User";
import IBoardRepo from "./IRepos/IBoardRepo";
import IUserRepo from "./IRepos/IUserRepo";
import IBoardService from "./IServices/IBoardService";
import { BoardRow } from "../model/Board/BoardRow";
import { BoardCol } from "../model/Board/BoardCol";
import { Board } from "../model/Board/Board";
import { BoardTitle } from "../model/Board/BoardTitle";
import { BoardMap } from "../mappers/BoardMapper";


export default class BoardService implements IBoardService{

    constructor(
        private userRepo: IUserRepo,
        private boardRepo: IBoardRepo
    ) {}
    
    public async createBoard(boardDTO: IBoardDTO): Promise<Result<{boardDTO: IBoardDTO}>>{
        const userFound = await this.userRepo.findByEmail(boardDTO.boardOwner)

        if(!userFound){
            throw new Error("Owner not found")
        }

        const boardPermissions: Array<BoardPermission> = [];
        const ownerPermission = BoardPermission.create(userFound, AccessLevel.create("WRITE").getValue())
        boardPermissions.push(ownerPermission.getValue())

        const boardEntries: Array<BoardEntry> = [];
        
        for(let i=1; i<boardDTO.boardNCol.valueOf(); i++){
            const boardCol = BoardCol.create({ value: i.toString(), numberCol: BoardNCol.create(i).getValue() }).getValue();
            for(let j=1; j<boardDTO.boardNRow.valueOf(); j++){
                const boardRow = BoardRow.create({ value: j.toString(), numberRow: BoardNRow.create(j).getValue() }).getValue();
                
                const entry = await BoardEntry.create(boardRow, boardCol, "")
                boardEntries.push(entry.getValue())
            }
        }

        const board = Board.create({
            boardOwner: userFound,
            boardTitle: BoardTitle.create(boardDTO.boardTitle).getValue(),
            boardEntries: boardEntries,
            boardNRow: BoardNRow.create(boardDTO.boardNRow).getValue(),
            boardNCol: BoardNCol.create(boardDTO.boardNCol).getValue(),
            boardPermissions: boardPermissions
        })

        await this.boardRepo.save(board.getValue());

        const dto = BoardMap.toDTO(board.getValue())

        if(dto){
            return Result.ok<{boardDTO: IBoardDTO}>({boardDTO: dto});
        }else{
            return Result.fail<{boardDTO: IBoardDTO}>({boardDTO: undefined});
        }
    }

    public async getBoard(id: string): Promise<Result<{boardDTO: IBoardDTO}>>{
        const board = await this.boardRepo.findById(id);

        if(!board){
            throw new Error('Error fetching board')
        }
        const dto = BoardMap.toDTO(board)

        if(dto){
            return Result.ok<{boardDTO: IBoardDTO}>({boardDTO: dto});
        }else{
            return Result.fail<{boardDTO: IBoardDTO}>({boardDTO: undefined});
        }
    }
/*
    public async updateBoard(user: User, boardID: string, entry: BoardEntry, content: string): Promise<Result<{boardDTO: IBoardDTO}>>{
        const board = await this.boardRepo.findById(boardID);

        if(!board){
            throw new Error('Error fetching board')
        }
    }
*/
    public async getMyBoards(email: string): Promise<Result<IBoardDTO[]>>{
        try{
        const user = await this.userRepo.findByEmail(email);
        
        if(!user){
            return Result.fail<IBoardDTO[]>("User error");
        }
        const allBoards = await this.boardRepo.getMyBoards(user);

        if(!allBoards){
            return Result.fail<IBoardDTO[]>("Board error");
        }

        const finalMap = allBoards.map(board => BoardMap.toDTO(board))

        return Result.ok<IBoardDTO[]>(finalMap);
    }catch(e){
        throw e
    }
    }
    
}
