export interface IBoardPersistence{
    domainId: string;
    boardOwner: string;
    boardTitle: string;
    boardEntries: string[];
    boardNRow: number;
    boardNCol: number;
    boardPermissions: string[];
}