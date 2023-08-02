import { Image } from "./Image.types";

interface Post {
    id: number | string;
    title: string;
    body: string;
    atCreated: string;
    views: number;
    likes: number;
    comments: number;
    username: string;
    userAvatarUrl: string;
    urls_images: Array<string>,
    images: Image[],
    userId: string;
};

interface PostWithoutId {
    readonly _id: string,
    title: string;
    body: string;
    atCreated: string;
    views: number;
    likes: number;
    comments: number;
    username: string;
    userAvatarUrl: string;
    images: Image[],
    userId: string;
}

export {
    Post, PostWithoutId
}