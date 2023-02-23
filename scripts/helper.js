
export function randomRange(from, to) {

    return Math.floor(Math.random() * (to + 1 - from)) + from
}

export function setInnerHTML(element, html) {
    element.innerHTML = html;
}

export function getRandomColor() {
    return `rgb(${(Math.random() * 255)}, ${(Math.random() * 255)}, ${(Math.random() * 255)})`
};

export function uidGen(length = 16) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
//test remove