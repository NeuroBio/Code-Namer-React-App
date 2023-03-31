
// https://codepen.io/kucsatax/pen/vyWevX
let size = 'small';
const sparkle = 20;

export class SillyEffects {
    static getStarSize () {
        if(size === 'large') {
            size = 'small';
        } else if(size === 'small') {
            size = 'medium';
        } else {
            size = 'large';
        }

        return size;
    }

    static getStarStyle () {
        const css = {
            top: (Math.random() * 100) + '%',
            left: (Math.random() * 100) + '%',
            WebkitAnimationDelay: (Math.random() * sparkle) + 's',
            MozAnimationDelay: (Math.random() * sparkle) + 's'
        };
        return css;
    }
}