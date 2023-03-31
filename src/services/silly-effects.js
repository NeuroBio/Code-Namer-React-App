
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

        console.log(size)
        return size;
    }

    static getStarStyle () {   
        const css = {
            top: (Math.random() * 100) + '%',
            left: (Math.random() * 100) + '%',
            webkitAnimationDelay: (Math.random() * sparkle) + 's',
            mozAnimationDelay: (Math.random() * sparkle) + 's'
        };
        console.log(css);
        return css;
    }
}