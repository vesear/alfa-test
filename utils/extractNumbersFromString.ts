export default function extractNumbersFromString(priceStr: string | null) {
    const matches = priceStr?.match(/\d+/g);
    return matches ?? [];
}
