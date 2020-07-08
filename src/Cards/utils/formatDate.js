const formatDate = (d) => {
    let date = new Date(d)
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let time = hours + ':' + minutes
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day

    return day + "." + month + "." + year + " " + time 
  }

export default formatDate;