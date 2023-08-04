

export default function useSliceWord(word: string) : string {
    return word.slice(0, 100) + '...';
}