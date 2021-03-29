//load with sign-in/signup 
const usersUrl = "http://127.0.0.1:3000/users"
// ************************ constants***********************

const loginDiv = document.querySelector('div#login')
const loginButton = document.querySelector('#login')
const mainDiv = document.querySelector('div#main')
const logo = document.querySelector('img#logo')

// ************************ pages***********************

const page1 = document.querySelector('div[data-id="1"]')
const page2 = document.querySelector('div[data-id="2"]')
const page3 = document.querySelector('div[data-id="3"]')
const page4 = document.querySelector('div[data-id="4"]')
const page5 = document.querySelector('div[data-id="5"]')
const page6 = document.querySelector('div#end')


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

  logo.dataset.id = user.id
  
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


}



function currentState (current_state) {

    switch (current_state) {
        case 0:
            pageOne();
            break;
        case 1: 
            pageTwo();
            break;
        case 2:
            pageThree()
            break;
        case 3: 
            pageFour();
            break;
        case 4: 
            pageFive();
            'break';
        case 5: 
            end();
            break;
    }

}

function pageOne () {
    
    page1.style.display = "block"
    updateCurrentState(1)
}

function pageTwo () {

    page2.style.display = "block"
    page1.style.display = "none"
    updateCurrentState(2)

}

function pageThree () {
    
    page3.style.display = "block"
    page2.style.display = "none"
    updateCurrentState(3)
}

function pageFour () {
    
    page4.style.display = "block"
    page3.style.display = "none"
    updateCurrentState(4)
}

function pageFive () {
    
    page5.style.display = "block"
    page4.style.display = "none"
    updateCurrentState(5)
}

function end () {
    
    page6.style.display = "block"
    page5.style.display = "none"
    updateCurrentState(0)
}

document.addEventListener('click', (e) => {

    if (e.target.matches('button[id="1"]')) {
        pageTwo()
    } else if (e.target.matches('button[id="2"]')) {
        pageThree()

    } else if (e.target.matches('button[id="3"]')) {
        pageFour()
    } else if (e.target.matches('button[id="4"]')) {
        pageFive()
    } else if (e.target.matches('button[id="5"]')) {
        end()
    }


})

function updateCurrentState (currentPage) {
    const id = parseInt(logo.dataset.id)
    fetch(`${usersUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
        body: JSON.stringify({current_state: currentPage})
    })
    .then(res => res.json())
    .then(res => console.log(res))
}