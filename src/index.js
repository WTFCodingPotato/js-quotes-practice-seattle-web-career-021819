// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const URL = 'http://localhost:3000/quotes/'
const quoteList = document.getElementById("quote-list")
/// Grab data from server on load ///
function getFetch(){
  fetch(URL)
    .then(res => res.json())
    .then(json => {
      iterateJson(json)}
    )
}

function iterateJson(quotes) {
  while (quoteList.firstChild){
    quoteList.firstChild.remove()
  }
  quotes.forEach(quote => {
    populateQuotes(quote)
  })
}

/// Populate Quotes into quote list ///
function populateQuotes(quote) {
    let li = document.createElement('li')
    li.classList.add('quote-card')
    li.innerHTML = `<blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        </blockquote>`
    let likeButton = document.createElement('button')
    likeButton.classList.add('btn-success')
    likeButton.textContent = `Likes: ${quote.likes}`
    likeButton.addEventListener('click', () => {
      addLike(quote, likeButton)
      console.log('liked')
    })
    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'delete'
    deleteButton.classList.add('btn-danger')
    deleteButton.addEventListener('click', () => {
      //deleteQuote(quote)
      console.log('deleted')
    })
    li.appendChild(likeButton)
    li.appendChild(deleteButton)
    quoteList.appendChild(li)
}
///  Add a like button /////
function addLike(quote, likeButton){
  likes = quote.likes + 1
  const config = {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({likes: likes})
  }
  fetch(URL + quote.id, config)
    .then(res => res.json())
    .then(json => getFetch())
}
getFetch()
