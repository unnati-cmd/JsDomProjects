// Variables and declarations/initializations


//Left buttons
const addBtn = document.querySelector('#add-btn');
const upBtn = document.querySelector("#up-btn");
const downBtn = document.querySelector("#down-btn");

let stack = document.querySelector("#stack");
let form = document.querySelector("#form");

// Form buttons
const imageInput = document.querySelector("#image");
const nameInput = document.querySelector("#name");
const townInput = document.querySelector("#town");
const purposeInput = document.querySelector("#purpose");

const createBtn = document.querySelector(".create-btn");
const closeBtn = document.querySelector(".close-btn");

// Color buttons
const colorButtons = document.querySelectorAll(".color");

// Delete button
const delbtn = document.querySelector('#delete');

let notes = []
const savedNotes = localStorage.getItem("notes");
if(savedNotes){
    notes = JSON.parse(savedNotes)
}
notes.forEach(note=>{
    createCard(note);
});




// Main JS codes start from here

// Add button for new form creation
addBtn.addEventListener('click',function(){
    form.style.display = 'block';
})

form.addEventListener('submit',function(dets){
    dets.preventDefault();

    if(
        imageInput.value.trim() !== "" &&
        nameInput.value.trim() !== "" &&
        townInput.value.trim() !== "" &&
        purposeInput.value.trim() !== ""
    ){
        const selectedCategory =
            document.querySelector('input[name="category"]:checked')?.id;
        // card creation
        const obj = {
            image: imageInput.value,
            name: nameInput.value,
            town: townInput.value,
            purpose: purposeInput.value,
            category: selectedCategory,
            index: null
        };

        notes.push(obj);
        localStorage.setItem("notes",JSON.stringify(notes));

        createCard(obj);

        form.reset();
        form.style.display = 'none';
    }
})

function createCard(data){
    const card = document.createElement("div");
    card.classList.add("card");

    const profile = document.createElement("div");
    profile.classList.add("profile");

    const img = document.createElement("img");
    img.src = data.image || "https://via.placeholder.com/40";

    profile.appendChild(img);

    const name = document.createElement("h3");
    name.textContent = data.name;

    const info = document.createElement("div");
    info.classList.add("info");

    const townBlock = document.createElement("div");

    const townLabel = document.createElement("p");
    townLabel.textContent = "Home town";

    const townValue = document.createElement("span");
    townValue.textContent = data.town;

    townBlock.appendChild(townLabel);
    townBlock.appendChild(townValue);

    const purposeBlock = document.createElement("div");

    const purposeLabel = document.createElement("p");
    purposeLabel.textContent = "Purpose";

    const purposeValue = document.createElement("span");
    purposeValue.textContent = data.purpose;
    
    card.dataset.category = data.category;
    card.dataset.index = notes.length - 1;

    purposeBlock.appendChild(purposeLabel);
    purposeBlock.appendChild(purposeValue);

    info.appendChild(townBlock);
    info.appendChild(purposeBlock);

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.textContent = "Call";

    const messageBtn = document.createElement("button");
    messageBtn.classList.add("message");
    messageBtn.textContent = "Message";

    actions.appendChild(callBtn);
    actions.appendChild(messageBtn);

    card.appendChild(profile);
    card.appendChild(name);
    card.appendChild(info);
    card.appendChild(actions);

    card.addEventListener("click", function(){
        highlightCategory(card.dataset.category);
    }); 

    stack.prepend(card);
    highlightCategory(data.category);


    // Active Card
    card.addEventListener("click", function(){
        document.querySelectorAll(".card").forEach(c=>{
        c.classList.remove("active-card");
        });
        card.classList.add("active-card");
        highlightCategory(card.dataset.category);
    });
}

closeBtn.addEventListener('click',function(){
    form.reset();
    form.style.display = 'none';
})

// Circle the category
function highlightCategory(category){
    const map = {
        emergency: "black",
        important: "brown",
        urgent: "purple",
        norush: "teal"
    };

    colorButtons.forEach(circle=>{
        circle.classList.remove("active");
    });

    const circleClass = map[category];
    const target = document.querySelector("." + circleClass);

    if(target){
        target.classList.add("active");
    }
}

//Up Button and Down Button
upBtn.addEventListener('click',function(dets){
    let lastChild = stack.lastElementChild;
    if(lastChild){
        stack.insertBefore(lastChild, stack.firstElementChild);
        updateStack();
    }
})

downBtn.addEventListener('click',function(){
    let firstChild = stack.firstElementChild;
    if(firstChild){
        stack.appendChild(firstChild);
        updateStack();
    }
})

function updateStack(){
    const cards = document.querySelectorAll(".stack .card");
    for(let i=0;i<3;i++){
        cards.forEach(function(card, i){
            card.style.zIndex = 3 - i;
            card.style.transform = `translateY(${i * 7}px) scale(${1 - i * 0.02})`;
            card.style.opacity = `${1 - i * 0.02}`;
        });
    }
}


// Delete Button
delbtn.addEventListener('click', function(dets){
    const activeCard = document.querySelector(".active-card");

    if(!activeCard) return;

    const index = activeCard.dataset.index;

    notes.splice(index,1);

    localStorage.setItem("notes", JSON.stringify(notes));

    activeCard.remove();
})