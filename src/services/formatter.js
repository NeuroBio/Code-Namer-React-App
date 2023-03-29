export class Formatter {
    static combineAllNameParts (nameParts) {
       let formatted = this.toCamelCase(nameParts[0]);
       nameParts
        .slice(1)
        .forEach((variable) => {
            formatted += this.toPascalCase(variable);
        });
        return formatted;
    }

    static combineAllNamePartsForClass (nameParts) {
        let formatted = '';
        nameParts.forEach((variable) => {
            formatted += this.toPascalCase(variable);
        });
        return formatted;
    }

    static jeremyTruncate (input) {
        return input.split(' ').pop();
    }

    static toCamelCase (input) {
        return input
            .split(' ')
            .map((word, index) => {
                if (!word) {
                    return '';
                }
                if (index === 0) {
                    return  word.toLowerCase();
                }
                return word[0].toUpperCase() + word.substring(1).toLowerCase();
            })
            .join('');
    }

    static toPascalCase (input) {
        return input
            .split(' ')
            .map((word) => {
                if (!word) {
                    return '';
                }
                return word[0].toUpperCase() + word.substring(1).toLowerCase();
            })
            .join('');
    }

    static toPlural (input) {
        const parts = input.split(' ')
        let lastWord = parts.pop()
        if (lastWord.match(/(ch|s|z|x)$/)) {
            lastWord = `${lastWord}es`;
        } else if (lastWord.match(/[^aeiou](y)$/)) {
            lastWord = lastWord.replace('y', 'ies');
        } else {
            lastWord = `${lastWord}s`;
        }
        parts.push(lastWord);
        return parts.join(' ');
    }
}