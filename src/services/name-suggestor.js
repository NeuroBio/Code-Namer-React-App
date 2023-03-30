const Words = [
    'cat',
    ''
];

export class NameSuggestor {
    static suggestRecordName(howMany = 1) {
        const suggestion = [];
        while (suggestion.length < howMany) {
            const word = this.getWord();

            if (!suggestion.includes(word)) {
                suggestion.push(word);
            }
        }

        return suggestion;
    }

    static getWord () {
        return Words[Math.floor(Math.random()*Words.length)];
    }
}