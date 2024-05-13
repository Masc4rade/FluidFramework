import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EntryTitleProps{
    value: string;
}

export class EntryTitle extends ValueObject<EntryTitleProps>{
    get value (): string{
        return this.props.value;
    }

    private constructor(props: EntryTitleProps){
        super(props);
    }

    public static create (entryTitle: string): Result<EntryTitle>{
        const result = Guard.againstNullOrUndefined(entryTitle, ' EntryTitle')
    
        if (!result.succeeded) {
            return Result.fail<EntryTitle>(result.message);
        } 
      
        if (entryTitle.length < 1) {
            return Result.fail<EntryTitle>('The title should have at least 1 character');
        }

        return Result.ok<EntryTitle>(new EntryTitle({value: entryTitle}))
    }
}