import { Response, Request, NextFunction} from 'express';
import { IUserDTO } from '../dto/IUserDTO';
import UserService from '../services/userService';
import IUserController from './IControllers/IUserController';


export default class UserController implements IUserController{
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    } 

    public async createUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const userDTO: IUserDTO = req.body

            const result = await this.userService.signUp(userDTO);

            if(result.isSuccess){
                res.status(201).json(result.getValue());
            }else{
                res.status(400).json({ error: result.error })
            }
        }catch (error) {
            res.status(500).json(error);
        }
    }
    
    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const name = ""
            const result = await this.userService.signIn({ name, email, password });
            
            if (result.isSuccess) {
                res.status(200).json(result.getValue());
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}