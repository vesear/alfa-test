export default function getRandomElementArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}
