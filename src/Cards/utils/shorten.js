const shorten = (phrase) => {
  const regex = new RegExp("общество с ограниченной ответственностью", "i")
  return phrase.replace(regex, "ОсОО")
}

export default shorten;