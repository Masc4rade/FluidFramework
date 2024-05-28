import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService {
    signIn(user: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>,
    signUp(user: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
}