//load with sign-in/signup 
const usersUrl = "http://127.0.0.1:3000/users"
// ************************ constants***********************

const loginDiv = document.querySelector('div#login')
const loginButton = document.querySelector('#login')
const mainDiv = document.querySelector('div#main')


// ************************ init ***********************
document.addEventListener('DOMContentLoaded', () => {
  login()
})

// ************************ login ***********************
function login () {

    
    const form = loginDiv.querySelector('form')

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const username = e.target.username.value

      fetch(usersUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({username})
      })
        .then(res => res.json())
        .then(user => mainPage(user))
       
        loginDiv.style.display = "none"
        mainDiv.style.display = "block"
    })


}


// ************************ start/help ***********************

mainDiv.addEventListener('click', (e) => {
    if (e.target.matches('button#start')){
        
        const id = parseInt(e.target.dataset.id)
        startGame(id);
        mainDiv.style.display = "none"
        
        
        
        console.log("start")
    } else if (e.target.matches('button#help')){

        help();
        console.log('help')
    }
})



// ************************ game page ***********************

function mainPage (user) {

  
  
  mainDiv.innerHTML = `
    <h2>Welcome Space Knight ${user.username}</h2>
    <button type="button" id="start">Start Game</button>
    <br><br>
    <button type="button" id="help">help</button>
  `
  startButton = document.querySelector('button#start')
  startButton.dataset.id = user.id

}

// ************************ start ***********************



function startGame (id) {
    fetch(`${usersUrl}/${id}`)
        .then(res => res.json())
        .then(({current_state}) => currentState(current_state))


    // mainDiv.innerHTML = `
    
    // <h2>${place.name}</h2>
    // <h2>park your spaceship at the parking meteor for 2 starbux</h2>
    // <p>${place.question}</p>

    // `

}



function currentState (current_state) {

    switch (current_state) {
        case 0:
            pageOne();
            break;
        case 1: 
            console.log('page 2');
            break;
        case 2:
            console.log('page 3');
            break;
        case 3: 
            console.log('page 4');
            break;
        case 4: 
            console.log('page 5');
            'break';
        case 5: 
            console.log('page 6');
            break;
    }

}

function pageOne () {
    const page = document.querySelector('div[data-id="1"]')
    page.style.display = "block"
}

function pageTwo () {
    const page = document.querySelector('div[data-id="2"]')
    page.style.display = "block"
}

function pageThree () {
    const page = document.querySelector('div[data-id="3"]')
    page.style.display = "block"
}

function pageFour () {
    const page = document.querySelector('div[data-id="4"]')
    page.style.display = "block"
}

function pageFive () {
    const page = document.querySelector('div[data-id="5"]')
    page.style.display = "block"
}

function end () {
    const page = document.querySelector('div#end')
    page.style.display = "block"
}