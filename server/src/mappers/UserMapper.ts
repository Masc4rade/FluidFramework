import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";

import { User } from "../model/User/User";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


export class UserMap extends Mapper<User> {

  public static toDTO( user: User): IUserDTO {
    return {
      name: user.name,
      email: user.email.value,
      password: user.password.value
    } as IUserDTO;
  }

  public static async toDomain (raw: any): Promise<User> {

    const userOrError = User.create({
      name: raw.name,
      email: raw.email,
      password: raw.password
    }, new UniqueEntityID(raw.domainId))

    userOrError.isFailure ? console.log(userOrError.error) : '';

    return userOrError.getValue();
  }

  public static toPersistence (user: User): any {
    const a = {
      domainId: user.id.toString(),
      name: user.name,
      email: user.email,
    }
    return a;
  }
}
