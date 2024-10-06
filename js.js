const cardContainer = document.getElementById("card-container")

const loadPets = (pet) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/${pet}`)
        .then(res => res.json())
        .then(data => viewPets(data.pets))
}

const loadByCategory = (categoryName) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
        .then(res => res.json())
        .then(data => viewPets(data.data))

}


const viewPets = (pets) => {
    const cardContainer = document.getElementById("card-container")
    if (pets.length === 0) {
        cardContainer.classList.remove("grid")
        cardContainer.innerHTML = `
        <div class="text-center flex flex-col items-center mx-auto ">
        <img src="./images/error.webp" alt="">
        <p class="text-4xl font-bold" >No Information Available</p> 
        <p class="font-bold">It is a long established fact that a reader will be distracted by the readable content of a <br> page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
        
        </div>
        
       `
        return;
    }
    else {
        const cardContainer = document.getElementById("card-container")
        cardContainer.classList.add("grid")
        pets.forEach((p) => {
            const cardBox = document.createElement("div")
            cardBox.innerHTML = `
<!-- card section -->
<div class="card bg-base-100 ">
  <figure>
    <img
      src=${(p.image)}
      alt=${p.pet_name} />
  </figure>
  <div class="card-body">
    <h2 class="card-title">
    ${p.pet_name}
    </h2>
    <p>Breed: ${p.breed}</p>
    <p>Birth: ${p.date_of_birth}</p>
    <p>Gender: ${p.gender}</p>
    <p>Price: ${p.price}$</p>
    <div class="card-actions flex flex-row justify-between">
        <button onclick="(loadById('${p.petId}'))" class="btn px-3"><i class="fa-regular fa-thumbs-up"></i></button>
        <button class="btn px-3">Adopt</button>
        <button onclick="loadForModalById(${p.petId})" class="btn px-3">Details</button>

    </div>
  </div>
</div>`


            cardContainer.appendChild(cardBox)
        });
    }


}


loadPets('pets')




// load for modal by id 
const loadForModalById = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then(res => res.json())
    .then(data => ModalDetails(data.petData))
}


// details in modal
const ModalDetails = (data) => {
    
    
    document.getElementById("my_modal_5").showModal()
    const modalDetailsDiv = document.getElementById("modal-details")
    modalDetailsDiv.innerHTML="";
    const div = document.createElement("div")
       div.innerHTML=`<img src="${data.image}" alt="">
       <p class="font-bold text-2xl">${data.pet_name}</p>
       <p>${data.breed}</p>
       <p>${data.gender}</p>
       <p>${data.vaccinated_status}</p>
       <p>${data.date_of_birth}</p>
       <p>${data.price}</p>
       <p class="font-bold text-base">Details Information</p>
       <p>${data.pet_details}</p>


       `
       modalDetailsDiv.appendChild(div)
}

// active button

const dogsButton = document.getElementById("Dogs-btn")
const catsButton = document.getElementById("Cats-btn")
const rabbitsButton = document.getElementById("Rabbits-btn")
const birdsButton = document.getElementById("Birds-btn")


dogsButton.addEventListener("click", function () {
    dogsButton.classList.add("rounded-full")
    catsButton.classList.remove("rounded-full")
    rabbitsButton.classList.remove("rounded-full")
    birdsButton.classList.remove("rounded-full")
    cardContainer.innerHTML = "";
    loadByCategory("Dog")
})
catsButton.addEventListener("click", function () {
    dogsButton.classList.remove("rounded-full")
    catsButton.classList.add("rounded-full")
    rabbitsButton.classList.remove("rounded-full")
    birdsButton.classList.remove("rounded-full")
    cardContainer.innerHTML = "";
    loadByCategory("Cat")
})
rabbitsButton.addEventListener("click", function () {
    dogsButton.classList.remove("rounded-full")
    catsButton.classList.remove("rounded-full")
    rabbitsButton.classList.add("rounded-full")
    birdsButton.classList.remove("rounded-full")
    cardContainer.innerHTML = "";
    loadByCategory("Rabbit")
})
birdsButton.addEventListener("click", function () {
    dogsButton.classList.remove("rounded-full")
    catsButton.classList.remove("rounded-full")
    rabbitsButton.classList.remove("rounded-full")
    birdsButton.classList.add("rounded-full")
    cardContainer.innerHTML = "";
    loadByCategory("Bird")
})

// load pet data by id
const loadById = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => likedItems(data.petData))
}
// likeditems
const likedItems = (obj) => {
    console.log(obj.image)
    const rightBar = document.getElementById("right-bar")
    const img = document.createElement("img")
    img.classList.add("border", "border-red-500",)
    img.src = `${obj.image}`

    rightBar.append(img)

}
