//Example fetch using DnD5eAPI - place subclasses in ul

// variable declarations
let laugh = new Audio()
laugh.src = "img/laugh.mp3"
let imgObj ;
let animate ;
window.onload = init;

//Event Listeners
document.querySelector('button').addEventListener('click', getFetch)
document.querySelector('button').addEventListener('click', gobLaugh)
document.querySelector('button').addEventListener('click', gobRun)
document.querySelector('button').addEventListener('click', init)

// function to play the Goblin Laugh
function gobLaugh() {
  laugh.play();
}


// function to make the goblin image run across the screen
function init() {
  imgObj = document.querySelector('#TGlogo');
  imgObj.style.position = "relative";
  imgObj.style.right = '0px'
}

function gobRun() {
  imgObj.style.right = parseInt(imgObj.style.right) + 20 + "px";
  animate = setTimeout(gobRun, 20);
  }


// function to clear the DOM for the new Entry
function clearList(list) {
  while(list.firstChild) {
    list.firstChild.remove()
  }
}

//function to fetch the data from the database and display it on the DOM
function getFetch(){
    // because using hyphens in your entry would be stupid, and this api is stupid, break apart the spaced entry into an array and join it back together with hyphens to work in the api
  const choice = document.querySelector('#textInput').value
  let url = ""
  let choiceInput = choice.split(' ')
  let choiceJoin = choiceInput.join('-').toLowerCase()
  let radOpt = document.querySelector("input[name='search']:checked").value;
  console.log(radOpt)
  clearList(classList)
  clearList(subClassList)
  clearList(descList)
  clearList(damageList)
  // decide which section of the api to pull from dependant on radio button selected
  if(radOpt === 'spellButt') {
     url = `https://www.dnd5eapi.co/api/spells/${choiceJoin}`
  }
  else if(radOpt === 'classButt') {
    url = `https://www.dnd5eapi.co/api/classes/${choiceJoin}`
  }
  else if(radOpt === 'monstButt') {
    url = `https://www.dnd5eapi.co/api/monsters/${choiceJoin}`
  }
  else if(radOpt === "raceButt") {
    url = `https://www.dnd5eapi.co/api/races/${choiceJoin}`
  }
  else if(radOpt === "itemButt") {
    url = `https://www.dnd5eapi.co/api/equipment/${choiceJoin}`
  }
  
// SPELL SEARCH FUNCTION
  if(radOpt == "spellButt") {
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
       console.log(data)
       document.querySelector('h2').innerText = data.name
       document.querySelector('h3').innerText = "Classes"
       document.querySelector('h4').innerText = "Sub-Classes"
       document.getElementById('description').innerText = "Description"
       document.getElementById('damage').innerText = "Range"
       document.getElementById('damageList').innerText = data.range
    data.classes.forEach(el => {
        
        console.log(el.name)
        // create an li
        const li = document.createElement('li')
        // add text to li
        li.textContent = el.name
        // append the li to ul
        document.querySelector('#classList').appendChild(li)
    })
    data.subclasses.forEach(el => {
          
           console.log(el.name)
           // create an li
           const li = document.createElement('li')
           // add text to li
           li.textContent = el.name
           // append the li to ul
           document.querySelector('#subClassList').appendChild(li)
       })
    data.desc.forEach(el => {
        console.log(el)
        // create an li
        const li = document.createElement('li')
        // add text to li
        li.textContent = el
        // append the li to ul
        document.querySelector('#descList').appendChild(li)
    })
    data.damage.forEach(el => {
      console.log(el.damage_at_slot_level)
    })

                  })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
// CLASS SEARCH FUNCTION
else if(radOpt === "classButt") {
    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
       console.log(data)
       document.querySelector('h2').innerText = data.name
       document.querySelector('h4').innerText = "Starting Equipment"
       document.querySelector('h3').innerText = "Saving Throws"
       document.querySelector("#description").innerText = "Proficiencies"
       document.querySelector('#damage').innerText = "Hit Die"
       document.querySelector('#damageList').innerText = data.hit_die
    data.starting_equipment.forEach(el => {
         console.log(el.equipment.name)
     // create an li
        const li = document.createElement('li')
         // add text to li
         li.textContent = el.equipment.name
         // append the li to ul
         document.querySelector('#subClassList').appendChild(li)
    })
    data.saving_throws.forEach(el => {
        console.log(el.name)
        const li = document.createElement('li')
        li.textContent = el.name
        document.querySelector('#classList').appendChild(li)
})
    data.proficiencies.forEach(el => {
        console.log(el.name)
        const li = document.createElement('li')
        li.textContent = el.name
        document.querySelector("#descList").appendChild(li)
})

     })
    }

else if(radOpt === "monstButt") {
    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
       console.log(data)
       document.querySelector('h2').innerText = data.name
       document.querySelector('h3').innerText = "Alignment"
       document.querySelector('h4').innerText = "Languages"
       document.querySelector("#damage").innerText = "Hit Points"
       document.querySelector("#description").innerText = "XP"

       document.querySelector('#classList').innerText = data.alignment
       document.querySelector('#subClassList').innerText = data.languages
       document.querySelector('#damageList').innerText = data.hit_points
       document.querySelector('#descList').innerText = data.xp
      })
    }
else if(radOpt === "raceButt") {
        fetch(url)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
           console.log(data)
           document.querySelector('h2').innerText = data.name
           document.querySelector('h3').innerText = "Alignment"
           document.querySelector('h4').innerText = "Languages"
           document.querySelector("#damage").innerText = "Traits"
           document.querySelector('#description').innerText = "Ability Bonus"

           document.querySelector('#classList').innerText = data.alignment
           data.languages.forEach(el => {
            console.log(el.name)
            const li = document.createElement('li')
            li.textContent = el.name
            document.querySelector("#subClassList").appendChild(li)
    })
          data.traits.forEach(el => {
            console.log(el.name)
            const li = document.createElement('li')
            li.textContent = el.name
            document.querySelector('#damageList').appendChild(li)
          })
          data.ability_bonuses.forEach(el => {
            console.log(el.ability_score.name)
            const li = document.createElement("li")
            li.textContent = `${el.ability_score.name} + ${el.bonus}`
            document.querySelector('#descList').appendChild(li)
          })
        })
      }
        
else if(radOpt === "itemButt") {
            fetch(url)
              .then(res => res.json()) // parse response as JSON
              .then(data => {
               console.log(data)
               document.querySelector('h2').innerText = data.name
               document.querySelector('h3').innerText = "Category / Range"
               document.querySelector('h4').innerText = "Item Type"
               document.querySelector('#damage').innerText = "Stats"
               document.querySelector('#description').innerText = "Weight / Price"

               data.damage.forEach(el => {
                 console.log(el.damage_dice)
                 console.log(el.damage_type.name)
                //  const li = document.createElement('li')
                //  li.textContent = el
              })
            })
          }
else if(radOpt === null) {
    console.log("oh shit")
    document.querySelector('h2').innerText = "Please Select a Category"
}
}

