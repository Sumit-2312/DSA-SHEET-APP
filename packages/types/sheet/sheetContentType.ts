

 export interface question{
    _id: string,
    title:string,
    difficulty : string,
    link: string,
    platform: string,
    isSolved: boolean,
    isCustom: boolean,
    notes: string
}

export interface folders {
    _id : string,
    name: string,
    parentFolderId: string,
    order: number,
    children : folders[],
    questions: question[]
}

export interface sheet {
    sheet: string, // name
    tree: folders[]
}

export type sheetContentType = sheet[];
