import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { User } from "../user/User";
import { AccessLevel } from "./AccessLevel";

interface BoardPermissionProps{
    user: User;
    accessLevel: AccessLevel
}

export class BoardPermission extends ValueObject<BoardPermissionProps>{
    get user (): User{
        return this.props.user;
    }
    get accessLevel (): AccessLevel{
        return this.props.accessLevel;
    }
    set user (user: User){
        this.props.user = user;
    }
    set accessLevel (accessLevel: AccessLevel){
        this.props.accessLevel = accessLevel;
    }

    private constructor(props: BoardPermissionProps){
        super(props);
    }

    public static create (user: User, accessLevel: AccessLevel): Result<BoardPermission>{
        const resultU = Guard.againstNullOrUndefined(user, ' user')
    
        if (!resultU.succeeded) {
            return Result.fail<BoardPermission>(resultU.message);
        } 
        
        const resultAL = Guard.againstNullOrUndefined(accessLevel, 'accessLevel')

        if (!resultAL.succeeded) {
            return Result.fail<BoardPermission>(resultAL.message);
        } 

        return Result.ok<BoardPermission>(new BoardPermission({user: user, accessLevel: accessLevel}))
    }
}