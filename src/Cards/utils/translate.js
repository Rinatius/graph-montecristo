import ru from './translationFiles/ru.json'

const tranlate_word = (word, language) => {
    if (word in ru) {
        if (language == 'ru') {
            return ru[word]
    }}
    else {
        return word
    }      
}

export default tranlate_word;