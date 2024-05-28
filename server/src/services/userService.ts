import IUserService from "./IServices/IUserService";
import IUserRepo from "./IRepos/IUserRepo";
import { Result } from "../core/logic/Result";
import { IUserDTO } from "../dto/IUserDTO";
import { User } from "../model/User/User";
import { UserMap } from "../mappers/UserMapper";
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

export default class UserService implements IUserService{
    constructor(
        private userRepo: IUserRepo
    ) {}
    
    public async signIn(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
        
        const user = await this.userRepo.findByEmail( userDTO.email );
    
        if (!user) {
          throw new Error('User not registered');
        }
    
        const validPassword = await argon2.verify(user.password.value, userDTO.password);
        if (validPassword) {
          const token = this.generateToken(user) as string;
    
          const userDTO = UserMap.toDTO( user ) as IUserDTO;
          return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTO, token: token} );
        } else {
          throw new Error('Invalid Password');
        }
      }

    public async signUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
        try {
            const user = await UserMap.toDomain(userDTO);
            const token = this.generateToken(user);
    
            await this.userRepo.save(user);
            const userDTOResult = UserMap.toDTO( user ) as IUserDTO;
            return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTOResult, token: token} )
    
        } catch (e) {
            throw e;
        }
      }
    private generateToken(user: User) {
    
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
    
        const id = user.id.toString();
        const email = user.email;
        const name = user.name;
        
        return jwt.sign(
          {
            id: id,
            email: email,
            name: name
          },
          "asdijasdhjashduashfdafsuh my sadjhasudhsadhuas secret",
          {algorithm: "HS256"}
        );
      }
}