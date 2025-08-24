import randomWords from "random-english-words";

export function generateWord() {
    let word = "";
    do {
        const result = randomWords(); // string | string[]
        word = Array.isArray(result) ? result[0] : result;
    } while (word.length < 3 || word.length > 5);

    return word.toUpperCase();
}