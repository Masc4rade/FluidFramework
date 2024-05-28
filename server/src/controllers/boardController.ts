import { NextFunction, Request, Response } from "express";
import { IBoardDTO } from "../dto/IBoardDTO";
import BoardService from "../services/boardService";
import IBoardController from "./IControllers/IBoardController";
import { Inject, Service } from 'typedi';

@Service()
export default class BoardController implements IBoardController{

    private readonly boardService: BoardService;

    constructor(boardService: BoardService) {
        this.boardService = boardService;
    }    

    public async createBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const boardDTO: IBoardDTO = req.body;

            const result = await this.boardService.createBoard( boardDTO);

            if (result.isSuccess) {
                res.status(201).json(result.getValue());
            } else {
                res.status(400).json({ error: result.error });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const boardId: string = req.params.id;

            const result = await this.boardService.getBoard(boardId);

            if (result.isSuccess) {
                res.status(200).json(result.getValue());
            } else {
                res.status(404).json({ error: "Board not found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getAllBoards(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: string = req.query.id as string;

            const result = await this.boardService.getMyBoards(userId);

            if (result.isSuccess) {
                res.status(200).json(result.getValue());
            } else {
                res.status(404).json({ error: "Board not found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

}