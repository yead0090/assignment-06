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
<div class="card bg-base-100 border border-gray-400">
  <figure>
    <img
      src=${(p.image)}
      alt=${p.pet_name} />
  </figure>
  <div class="card-body">
    <h2 class="card-title">
    ${p.pet_name ? p.pet_name : "Not Available"}
    </h2>
    <p>Breed: ${p.breed ? p.breed : "Not Available"}</p>
    <p>Birth: ${p.date_of_birth ? p.date_of_birth : "Not Available"}</p>
    <p>Gender: ${p.gender ? p.gender : "Not Available"}</p>
    <p>Price: ${p.price ? p.price : "Not Available"}$</p>
    <div class="card-actions flex flex-row justify-between">
        <button onclick="(loadById('${p.petId}'))" class="btn px-3"><i class="fa-regular fa-thumbs-up"></i></button>
        <button onclick="adoptBtn()" class="btn px-3">Adopt</button>
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
const loadForModalById = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => ModalDetails(data.petData))
}


// details in modal
const ModalDetails = (data) => {


    document.getElementById("my_modal_5").showModal()
    const modalDetailsDiv = document.getElementById("modal-details")
    modalDetailsDiv.innerHTML = "";
    const div = document.createElement("div")
    div.innerHTML = `<img src="${data.image}" alt="">
       <p class="font-bold text-2xl">${data.pet_name ? data.pet_name : "Not Available"}</p>
       <p>Breed:${data.breed ? data.breed : "Not Available"}</p>
       <p>Gender:${data.gender ? data.gender : "Not Available"}</p>
       <p>Vaccinated Status:${data.vaccinated_status ? data.vaccinated_status : "Not Available"}</p>
       <p>Birth:${data.date_of_birth ? data.date_of_birth : "Not Available"}</p>
       <p>Price:${data.price ? data.price : "Not Available"}</p>
       <p class="font-bold text-base">Details Information</p>
       <p>Details:${data.pet_details ? data.pet_details : "Not Available"}</p>


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
    loadSpinner("Dog")

})
catsButton.addEventListener("click", function () {
    dogsButton.classList.remove("rounded-full")
    catsButton.classList.add("rounded-full")
    rabbitsButton.classList.remove("rounded-full")
    birdsButton.classList.remove("rounded-full")
    cardContainer.innerHTML = "";
    loadSpinner("Cat")
})
rabbitsButton.addEventListener("click", function () {
    dogsButton.classList.remove("rounded-full")
    catsButton.classList.remove("rounded-full")
    rabbitsButton.classList.add("rounded-full")
    birdsButton.classList.remove("rounded-full")
    cardContainer.innerHTML = "";

    loadSpinner("Rabbit")
})
birdsButton.addEventListener("click", function () {
    dogsButton.classList.remove("rounded-full")
    catsButton.classList.remove("rounded-full")
    rabbitsButton.classList.remove("rounded-full")
    birdsButton.classList.add("rounded-full")
    cardContainer.innerHTML = "";

    loadSpinner("Bird")

})

// load pet data by id
const loadById = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => likedItems(data.petData))
}
// likeditems
const likedItems = (obj) => {
    const rightBar = document.getElementById("right-bar")
    const img = document.createElement("img")
    img.classList.add("p-2", "rounded-xl", "border", "border-gray-500")
    img.src = `${obj.image}`

    rightBar.append(img)

}

const loadSpinner = (petName) => {
    document.getElementById("spinner").classList.remove("hidden")
    setTimeout(function () {
        document.getElementById("spinner").classList.add("hidden");
        loadByCategory(petName);

    }, 2000)
}


// sort by price 
const sortBtn = document.getElementById("sort-btn").addEventListener("click", function () {
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = "";

    const loadSpinner2 = () => {
        document.getElementById("spinner").classList.remove("hidden")
        setTimeout(function () {
            document.getElementById("spinner").classList.add("hidden");

            fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
                .then(res => res.json())
                .then(data => viewPets(data.pets.sort((a, b) => b.price - a.price)))
        }, 2000)
    }
    loadSpinner2()

})

// adopt btn
const adoptBtn = () => {
    const modal2 = document.getElementById("my_modal_2")

    modal2.showModal();
    const modalDetails2 = document.getElementById("modal-details2")
    const div = document.createElement("div")
    modalDetails2.innerHTML = "";
    div.classList.add("flex", "flex-col", "items-center")
    div.innerHTML = `
    <i class="fa-regular fa-handshake text-4xl font-bold text-center items-center"></i>
    <p class="text-4xl font-bold text-center">Congrats</p>
    <p class="text-2xl font-bold text-center mt-10">Adoption Process will start For Your Pet in</p>
    <p id="counter" class="text-5xl font-bold text-center mt-10">3</p>
    `
    modalDetails2.appendChild(div)


    let timer = 3;

    const intervalId = setInterval(() => {
        const counter = document.getElementById("counter")
        if (timer < 1) {
            clearInterval(intervalId);
            document.getElementById("modal-close").click()

                ;
        }
        else {
            counter.innerHTML = timer
            timer--;
        }
    }, 1000);




}

const timerfunction = () => {


}
