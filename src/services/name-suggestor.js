const Words = [
    'cat',
    'bin',
    'license',
    'plate',
    'task',
    'batch',
    'slurry',
    
];

export class NameSuggestor {
    static suggestRecordName(howMany) {
        if (!howMany) {
            howMany = Math.floor(Math.random()*5) + 1;
        }

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