interface Post {
    id: number;
    title: string;
    body: string;
    atCreated: string;
    views: number;
    likes: number;
    comments: number;
    username: string;
    userAvatarUrl: string;
    urls_images: Array<string>,
};

export {
    Post,
}