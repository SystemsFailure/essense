interface Message {
    id: number;
    body: string;
    atCreated: string;
    atUpdated: string;
    atView: string;
    view: boolean;
    to: string;
    from: string;
};

export {
    Message,
}