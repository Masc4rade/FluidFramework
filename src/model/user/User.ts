import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { UserId } from "../id/UserID";
import { AggregateRoot } from "../../core/domain/AggregateRoot";

interface UserProps{
    name: string;
    email: string;
}

export class User extends AggregateRoot<UserProps>{
    get id(): UniqueEntityID{
        return this._id;
    }
    get userId (): UserId{
        return new UserId(this.id.toString())
    }
    get name (): string{
        return this.props.name;
    }
    
    get email (): string{
        return this.props.email;
    }

    set name (name: string){
        this.props.name = name;
    }
    
    set email (email: string){
        this.props.email = email;
    }

    private constructor(props: UserProps, id?: UniqueEntityID){
        super(props, id);
    }

    public static create (props: UserProps, id?: UniqueEntityID): Result<User>{
        const result = Guard.againstNullOrUndefined(props.email, ' email')
    
        if (!result.succeeded) {
            return Result.fail<User>(result.message);
        }else{
            const user = new User({...props}, id)
            return Result.ok<User>(user)
        }      
    }
}