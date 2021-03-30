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


// ************************ pages***********************

const page1 = document.querySelector('div[data-id="1"]')
const page2 = document.querySelector('div[data-id="2"]')
const page3 = document.querySelector('div[data-id="3"]')
const page4 = document.querySelector('div[data-id="4"]')
const page5 = document.querySelector('div[data-id="5"]')
const page6 = document.querySelector('div[data-id="6"]')
const page7 = document.querySelector('div#end')



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
            .then(({starbux, marsbar, lives}) => {
                starbuxPTag.textContent = starbux
                marsbarPTag.textContent = marsbar
                livesPTag.textContent = lives
                startGame(id)
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
    //43 add delete character button
})




createCharacterForm.addEventListener('submit', (e) => {
    e.preventDefault()
   const name = e.target.name.value
   const image = e.target.image.value
   const user_id = logo.dataset.id
    
   const newChar = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({name, image, user_id})
}
    fetch(charsUrl, newChar)
        .then(res => res.json())
        .then(charObj => {
            renderOneCharacter(charObj)
            console.log(charObj)
        })

})
// ******************* el page 4 ********************
page4.addEventListener('click', (e) => {
    if (e.target.matches('button#galaxy')) {
        const audio = e.target.previousElementSibling
        audio.play()
        //43 update lose life
        //if lives == 0, game over screen

    } else if(e.target.matches('button#saturn')) {
        const audio = e.target.previousElementSibling
        audio.play()
        pageFive()


    } else if(e.target.matches('button#rolled')) {
        const audio = e.target.previousElementSibling
        audio.play()
        //43 update lose life
        //if lives == 0, game over screen
        page4.style.display = "none"
        pageOne()
        
    }
})
// ******************* el temp ********************
document.addEventListener('click', (e) => {

    //43 update starbux fetch and update the view
    // const id = parseInt(startButton.dataset.id)
    if (e.target.matches('button[id="1"]')) {
    //     fetch(`${charsUrl}/${id}`, { 
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify({starbux: 3})
    //     })
    //         .then(res => res.json())
    //         .then(charObj => console.log(charObj))

        
        pageTwo()

    } else if (e.target.matches('button[id="2"]')) {
        pageThree()

    } else if (e.target.matches('button[id="3"]')) {
        pageFour()
    }  else if (e.target.matches('button[id="5"]')) {
        pageSix()
    } else if (e.target.matches('button[id="6"]')) {
        end()
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

function pageSix () {
    
    page6.style.display = "block"
    page5.style.display = "none"
    updateCurrentState(6)
}

function end () {
    
    page7.style.display = "block"
    page6.style.display = "none"
    updateCurrentState(0)
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


    function updateCurrentState (currentPage) {
        
        const starbux = parseInt(starbuxPTag.textContent)
        const marsbar = parseInt(marsbarPTag.textContent)
        const lives = parseInt(livesPTag.textContent)
        

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
            body: JSON.stringify({current_state: currentPage})
        })
            .then(res => res.json())
            .then( charObj => console.log(charObj))
    }

function loseLife() {
    fetch(`${charsUrl}/${id}`, {
        method: 'UPDATE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(charObj)
    })
}