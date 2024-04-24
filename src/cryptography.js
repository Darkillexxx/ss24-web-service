const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
function encrypt(text, index = 3) {
    let result = ''

    for (let i = 0; i < text.length; i++) {

        if(alphabet.includes(text[i])){
            result += alphabet[(alphabet.indexOf(text[i])+index)%26]
        }
        else if(text[i] === ' '){
            result += text[i]
        }
    }
    return result
}

function decrypt(decoded, index = 3){
    let result = ''
    for(let i = 0; i<decoded.length; i++){
        if(alphabet.includes(decoded[i])){
            result += alphabet[(alphabet.indexOf(decoded[i])-index+26)%26]
        }
        else if(decoded[i] === ' '){
            result += decoded[i]
        }
    }
    return result
}

let text = 'Check Message'
let decoded = 'D YHUB VHFUHW PHVVDJH'
console.log(encrypt(text.toUpperCase()))
console.log(decrypt(decoded.toUpperCase()))
export {encrypt, decrypt}