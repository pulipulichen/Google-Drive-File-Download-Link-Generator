// import $ from 'jquery'

//let requestHeaders = {
  // 4jsnJjdPml6wKHXNhOg6Z5MqnuVcxt8572ozMKTbICD4EYWs4NQosTR9Flmg
//}

async function TinyURLAPI (url) {
  let cache = localStorage.getItem(url)
  if (cache) {
    return cache
  }

  return new Promise((resolve) => {
    /*
    $.post('https://api.tinyurl.com/create', {
      url: url.trim(),
      domain: 'tiny.one'
    }, (result) => {
      resolve(result.data.tiny_url)
    })
    */
    $.get('https://tinyurl.com/api-create.php?url=' + url, (shortenUrl) => {
      localStorage.setItem(url, shortenUrl)
      resolve(shortenUrl)
    })
  })
}

// export default TinyURLAPI