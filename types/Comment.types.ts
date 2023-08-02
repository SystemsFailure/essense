interface Comment {
    readonly _id: string;
    userId: string | undefined,
    destinationId: string | boolean,
    body: string,
    avatarUrl: string,
    postId: string,
    likes: number,
}

export {Comment};