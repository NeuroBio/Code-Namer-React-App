export class Formatter {
    static combineAllVars (vars) {
       let formatted = this.toCamelCase(vars[0]);
       vars
        .slice(1)
        .forEach((variable) => {
            formatted += this.toPascalCase(variable);
        });
        return formatted;
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
    static toPascalCase(input) {
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
}