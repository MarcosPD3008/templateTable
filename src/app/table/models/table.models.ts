export interface TableHeader {
    key: string;
    label: string;
}

export interface TableAction {
    label: string;
    function?: Function;

    _id?: string;
}