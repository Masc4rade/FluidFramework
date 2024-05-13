import { SharedMap } from "@fluidframework/map";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { BoardRow } from "./BoardRow";
import { BoardCol } from "./BoardCol";
import { EntryNumber } from "./EntryNumber";
import { EntryTitle } from "./EntryTitle";

interface BoardEntryProps {
    boardRowPos: BoardRow;
    boardColPos: BoardCol;
    entryNumber: EntryNumber;
    entryTitle: EntryTitle;
    content: string; // Or you can use a more complex type for content such as a data URL for images
}

export class BoardEntry {
    private sharedMap: SharedMap;
    private key: string;

    constructor(sharedMap: SharedMap, key: string, props: BoardEntryProps) {
        this.sharedMap = sharedMap;
        this.key = key;
        this.update(props);
    }

    private update(props: Partial<BoardEntryProps>): void {
        const currentProps = this.sharedMap.get<BoardEntryProps>(this.key) || {};
        const updatedProps = { ...currentProps, ...props };
        this.sharedMap.set(this.key, updatedProps);
    }

    public static async createOrUpdate(sharedMap: SharedMap, key: string, boardRowPos: BoardRow, boardColPos: BoardCol, entryTitle: EntryTitle, entryNumber: EntryNumber, content: string): Promise<Result<BoardEntry>> {
        const resultRP = Guard.againstNullOrUndefined(boardRowPos, 'boardRowPos');
        if (!resultRP.succeeded) {
            return Result.fail<BoardEntry>(resultRP.message);
        }

        const resultCP = Guard.againstNullOrUndefined(boardColPos, 'boardColPos');
        if (!resultCP.succeeded) {
            return Result.fail<BoardEntry>(resultCP.message);
        }

        const resultET = Guard.againstNullOrUndefined(entryTitle, 'entryTitle');
        if (!resultET.succeeded) {
            return Result.fail<BoardEntry>(resultET.message);
        }

        const resultEN = Guard.againstNullOrUndefined(entryNumber, 'entryNumber');
        if (!resultEN.succeeded) {
            return Result.fail<BoardEntry>(resultEN.message);
        }

        const props: BoardEntryProps = { boardRowPos, boardColPos, entryTitle, entryNumber, content };
        return Result.ok<BoardEntry>(new BoardEntry(sharedMap, key, props));
    }

    public static async getEntry(sharedMap: SharedMap, key: string): Promise<BoardEntry | undefined> {
        const props = sharedMap.get<BoardEntryProps>(key);
        if (props) {
            return new BoardEntry(sharedMap, key, props);
        }
        return undefined;
    }

    public static deleteEntry(sharedMap: SharedMap, key: string): void {
        sharedMap.delete(key);
    }

    public async updateContent(content: string): Promise<void> {
        this.update({ content });
    }
}