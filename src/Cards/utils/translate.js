import ru from './translationFiles/ru.json'

const tranlate_word = (word, language) => {
    if (language == 'ru') {
        return ru[word]
    }        
}

export default tranlate_word;