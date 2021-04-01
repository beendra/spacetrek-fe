//load with sign-in/signup 
const usersUrl = "http://127.0.0.1:3000/users"
const charsUrl = "http://127.0.0.1:3000/characters"
// ************************ constants***********************

const loginDiv = document.querySelector('div#login')
const loginButton = document.querySelector('#login')
const mainDiv = document.querySelector('div#main')
const logo = document.querySelector('img#logo')
const startButton = document.querySelector('button#start')
const charDiv = document.querySelector('div#characters')
const createCharacterForm = document.querySelector('form#create-character')
const items = document.querySelector('div#items')
const starbuxPTag = items.querySelector('p#starbux')
const marsbarPTag = items.querySelector('p#marsbar')
const livesPTag = items.querySelector('p#lives')
const charInPlayDiv = document.querySelector('div#character-in-play')


// ************************ pages***********************

const page1 = document.querySelector('div[data-id="1"]')
const page2 = document.querySelector('div[data-id="2"]')
const page3 = document.querySelector('div[data-id="3"]')
const page4 = document.querySelector('div[data-id="4"]')
const page5 = document.querySelector('div[data-id="5"]')
const page6 = document.querySelector('div[data-id="6"]')
const page7 = document.querySelector('div#end')

pages = [page1, page2, page3, page4, page5, page6, page7, charInPlayDiv, items]



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


// ******************* event listeners ********************
// ******************* el main page ************************



mainDiv.addEventListener('click', (e) => {
    if (e.target.matches('button#start')){
    
        const id = parseInt(e.target.dataset.id)

        mainDiv.style.display = "none"
        items.style.display = "block"

        fetch(`${charsUrl}/${id}`)
            .then(res => res.json())
            .then((charObj) => {
                starbuxPTag.textContent = charObj.starbux
                marsbarPTag.textContent = charObj.marsbar
                livesPTag.textContent = charObj.lives
                startGame(id)
                const charInPlayDiv = document.querySelector('div#character-in-play')
                charInPlayDiv.innerHTML = `
                <img src= "${charObj.image}" alt= ${charObj.name}>`
                charInPlayDiv.style.display = "block"
            })
    } else if (e.target.matches('button#help')){

        help();
        console.log('help')
    } else if (e.target.matches('button#toggle')){
        console.log('click')
        const charCreateForm = document.querySelector('form#create-character')
            if (charCreateForm.style.display === "block"){
                charCreateForm.style.display = "none"
            }
            else {
                charCreateForm.style.display = "block"
            }
        console.log()
    }

})

charDiv.addEventListener('click', (e) => {
    if (e.target.matches('img.images')){
        startButton.dataset.id = e.target.dataset.id
        console.log(startButton.dataset.id)
    
    } else if(e.target.matches('button')) {
        
        console.log('delete')
        fetch(`${charsUrl}/${parseInt(e.target.dataset.id)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }        
        }) 
            .then(res => res.json())
            .then(res => {
                console.log(res);
                e.target.previousElementSibling.remove()
                e.target.remove()
            })
    }
})




createCharacterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const image = e.target.image.value
    const user_id = logo.dataset.id
    
    const newChar = {
        name,
        image,
        user_id,
        starbux: 5,
        marsbar: 2,
        lives: 2,
        current_state: 0
    }

    const body = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(newChar)
}
    fetch(charsUrl, body)
        .then(res => res.json())
        .then(charObj => {
            renderOneCharacter(charObj)
            console.log(charObj)
        })

        e.target.reset()

})

// ******************* el page2 ********************
page2.addEventListener('click', (e) => {
    if(e.target.matches('button.greeting')) {
    const h4 = document.createElement('h4')

        h4.textContent = `Oh no!! you have made the alien very angry, you told him his mom's feet are smelly! To advance you must make the alien your friend. Luckily aliens LOVE marsbars...click on your marsbar item to give the alien a marsbar`


        page2.append(h4)

        items.addEventListener('click', (e) => {
            if(e.target.matches('img#give-bar')) {

                let feedAlien = parseInt(marsbarPTag.textContent) - 1
                const starbux = parseInt(starbuxPTag.textContent)
                const lives = parseInt(livesPTag.textContent)
                const id = parseInt(startButton.dataset.id)

                charObj = {
                    current_state: parseInt(items.dataset.id),
                    starbux: starbux,
                    marsbar: feedAlien,
                    lives: lives
                }
        
                fetch(`${charsUrl}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(charObj)
                })
                    .then(resp => resp.json())
                    .then(updateChar => {
                
                    starbuxPTag.textContent = updateChar.starbux
                    marsbarPTag.textContent = updateChar.marsbar
                    livesPTag.textContent = updateChar.lives
                        
                    const happy = document.createElement('h4')

                    happy.textContent = `Alien: NOMNOMNOM...to advance to find pluto you must next find the movie star...good luck!` 
                    movieStar = document.createElement('button')
                    movieStar.textContent = `💫 🎬 ⭐️`
                    page2.append(happy, movieStar)


                    movieStar.addEventListener('click', () => {
                        pageThree()
                    })

                })
            }
        })
        
    }
})

// ******************* el movie star ********************

page3.addEventListener('click', (e) => {
    if(e.target.matches('img#clark')){
        console.log('clark')
        loseLife()
        alert("If It's Any Consolation, I Hate Me")


    } else if (e.target.matches('img#han-solo')) {
        console.log('solo')
        loseLife()
        alert('I think you just can’t bear to let a gorgeous guy like me out of your sight...')

    } else if (e.target.matches('img#picard')) {
        console.log('picard')
        alert('ENGAGE!')
        pageFour()


    }
})




// ******************* el neptunes ********************


page4.addEventListener('click', (e) => {
    if (e.target.matches('button#galaxy')) {
        const audio = e.target.previousElementSibling
        audio.play()
        loseLife()

    } else if(e.target.matches('button#saturn')) {
        const audio = e.target.previousElementSibling
        audio.play()
        saturnDown()
        pageFive()


    } else if(e.target.matches('button#rolled')) {
        const audio = e.target.previousElementSibling
        rickRolled()
        audio.play()
        
        loseLife()
        page4.style.display = "none"
        pageOne()
        
    } else if(e.target.matches('button#lose-life')) {
        
        page4.style.display = "none"
        pageFive()
        loseLife()
        
    }
})

// ******************* el saturn ********************
page5.addEventListener('click', (e) => {

    if (e.target.matches('img#planet')) {

        page5.innerHTML = `
        <h1>🤣 YOU PLANET 🪅 </h1>
        <button>proceed to deep space</button>
        `

        btn = page5.querySelector('button')
        
        btn.addEventListener('click', () => {
            pageSix()
        })
    }

})

// ******************* el deep space ********************
page7.addEventListener('click', (e) => {
    if(e.target.matches('button#main-page')) {
        backToMain()
    }
})
// ******************* el temp ********************
page1.addEventListener('click', (e) => {

    if (e.target.matches('button[id="1"]')) {

        
        let payForParking = parseInt(starbuxPTag.textContent) - 2
        const marsbar = parseInt(marsbarPTag.textContent)
        const lives = parseInt(livesPTag.textContent)
        const id = parseInt(startButton.dataset.id)

        charObj = {
            current_state: parseInt(items.dataset.id),
            starbux: payForParking,
            marsbar: marsbar,
            lives: lives
        }

        fetch(`${charsUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(charObj)
    })
    .then(resp => resp.json())
    .then(updateChar => {
        starbuxPTag.textContent = updateChar.starbux
        marsbarPTag.textContent = updateChar.marsbar
        livesPTag.textContent = updateChar.lives
        console.log(updateChar)
    })

        pageTwo()
}
})





// ************************ game page **********************

function mainPage (user) {

    logo.dataset.id = user.id
        const greetingH2 = mainDiv.querySelector('h2')

        greetingH2.textContent = `
        Welcome Space Knight ${user.username}
        `

    fetch (`${usersUrl}/${user.id}`)
    .then(resp => resp.json())
    .then(userChars => renderAllCharacters(userChars))
}

// ************************ helper ***********************
// ************************ start ***********************

function startGame (id) {

    fetch(`${charsUrl}/${id}`)
        .then(res => res.json())
        .then(({current_state}) => {
            currentState(current_state)

})
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
            pageSix();
            break;
        case 6: 
            end();
            break;
    }

}

// ************************ pages ***********************

function pageOne () {
    document.body.style.backgroundImage = "url('images/parkingmeteor.png')";
    page1.style.display = "block"
    updateCurrentState(1)
}

function pageTwo () {
    document.body.style.backgroundImage = "url('images/mercury.png')";
    page2.style.display = "block"
    page1.style.display = "none"
    updateCurrentState(2)

}

function pageThree () {
    document.body.style.backgroundImage = "url('images/moviestar.png')";
    page3.style.display = "block"
    page2.style.display = "none"
    updateCurrentState(3)
}

function pageFour () {
    document.body.style.backgroundImage = "url('images/neptunes.png')";
    page4.style.display = "block"
    page3.style.display = "none"
    updateCurrentState(4)
}

function pageFive () {
    document.body.style.backgroundImage = "url('images/saturn.png')";
    page5.style.display = "block"
    page4.style.display = "none"
    updateCurrentState(5)
}

function pageSix () {

    document.body.style.backgroundImage = "url('images/deepspace.png')";
    page6.style.display = "block"
    page5.style.display = "none"
    updateCurrentState(6)
    document.body.addEventListener('keydown', (e) => {
        if (e.keyCode == 32) {
            resetCharacter()
            end()
        } else {
            loseLife()
        }
    }) 
}

function end () {

    document.body.style.backgroundImage = "url('images/spacebar.png')";
    page7.style.display = "block"
    page6.style.display = "none"
    items.style.display = "none"
    updateCurrentState(0)
}


function backToMain() {
    pages.forEach(page => {
        page.style.display = "none"
    })

    mainDiv.style.display = "block"    
}





/*** HELPER METHODS ***/
// ************************ render ***********************


    function renderOneCharacter(charObj){
        const show = document.querySelector('ul#show')
        const img = document.createElement('img')
        const btn = document.createElement('button')
        btn.textContent = '❌'
        btn.dataset.id = charObj.id
        img.dataset.id = charObj.id
        img.className = "images"
        img.src = charObj.image
        img.alt = charObj.name

        show.append(img, btn)

    }

    function renderAllCharacters(userChars){
        userChars.forEach(charObj => {
            renderOneCharacter(charObj)
        })
    }

    function renderItems({starbux, marsbar, lives}){
        starbuxPTag.textContent = starbux
        marsbarPTag.textContent = marsbar
        livesPTag.textContent = lives
        }

    // *********************** other ***********************

    function updateCurrentState (currentPage) {
        
        const starbux = parseInt(starbuxPTag.textContent)
        const marsbar = parseInt(marsbarPTag.textContent)
        const lives = parseInt(livesPTag.textContent)
        console.log(`current page: ${currentPage}`)
        items.dataset.id = currentPage
        console.log(`items dataset_id: ${items.dataset.id}`)
        
        
        charObj = {
            current_state: currentPage,
            starbux: starbux,
            marsbar: marsbar,
            lives: lives
        }
        
        const id = parseInt(startButton.dataset.id)
        fetch(`${charsUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, 
            body: JSON.stringify(charObj)
        })
            .then(res => res.json())
            .then( charObj => console.log(charObj))
    }




function loseLife() {
    
    let downOne = parseInt(livesPTag.textContent) - 1
    const starbux = parseInt(starbuxPTag.textContent)
    const marsbar = parseInt(marsbarPTag.textContent)
    const id = parseInt(startButton.dataset.id)
    //mark
    
    
    if (downOne === 0){ 
        gameOver()
        
    } else {
        
        charObj = {
            current_state: parseInt(items.dataset.id),
            starbux: starbux,
            marsbar: marsbar,
            lives: downOne
        }

        fetch(`${charsUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
            body: JSON.stringify(charObj)
        })
            .then(resp => resp.json())
            .then(updateChar => {
        
                starbuxPTag.textContent = updateChar.starbux
                marsbarPTag.textContent = updateChar.marsbar
                livesPTag.textContent = updateChar.lives
                console.log(updateChar)
        })
    }

}


// ************************ alerts ***********************

function gameOver () {
    alert('GAME OVER LOSER')
    backToMain()
    resetCharacter()

}

function resetCharacter() {
    const id = parseInt(startButton.dataset.id)
    
    charObj = {
        current_state: 0,
        starbux: 5,
        marsbar: 2,
        lives: 2
    }

    fetch(`${charsUrl}/${id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(charObj)
    })
        .then(resp => resp.json())
        .then(charObj => {
            charInPlayDiv.style.display = "none"
            console.log(charObj)
        }) 
}

function rickRolled () {
    alert('🎧  YOU JUST GOT RICK ROLLED 🥁 badum CHING')
}

function saturnDown() {
    alert('🪐 SA-TURN DOWN FOR WHAT 🪐')
}