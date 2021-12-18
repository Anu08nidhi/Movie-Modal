'use strict'
var cl = console.log;
const myModal = document.querySelector('.myModal');
const backdrop = document.getElementById('backdrop');
const btnAdd = document.querySelector('.btnAdd');
const myClose = document.querySelectorAll('.myClose');
const addMovieCard = document.querySelector('.addMovieCard');
const title = document.querySelector('#title');
const rating = document.querySelector('#rating');
const image_url = document.querySelector('#image');
const movie_card = document.querySelector('.movie_card');
const updateMovie = document.querySelector('.updateMovie');
const modalDelete = document.querySelector('.modalDelete');
const trailer = document.getElementById('trailer');
let baseUrl = "http://localhost:3000/Movies";
let movieObj;

function fetchdata(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => templating(data));
}

const onToggleHandler = () => {
    myModal.classList.toggle('visible');
    backdrop.classList.toggle('visible');
}
const onClickAddMovie = () => {
    movieObj = {
        title: title.value,
        image_url: image_url.value,
        rating: rating.value,
        trailer: trailer.value
    }
    fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(movieObj),
        headers: {
            'content-type': 'application/json; charset="UTF-8"',
            'token': 'bearer token: movie token'
        }
    })
}
const onEdit = (e) => {
    onToggleHandler();
    let getId = e.getAttribute('data-target');
    let editUrl = `${baseUrl}/${getId}`
    localStorage.setItem("MovieId", JSON.stringify(getId));
    fetch(editUrl)
        .then(response => response.json())
        .then(data => {
            title.value = data.title,
                image_url.value = data.image_url,
                rating.value = data.rating,
                trailer.value = data.trailer
        });
    updateMovie.style.display = "inline-block";
    addMovieCard.style.display = "none";
}

const onClickUpdate = () => {
    let updateObj = {
        title: title.value,
        image_url: image_url.value,
        rating: rating.value,
        trailer: trailer.value
    }
    let getId = JSON.parse(localStorage.getItem("MovieId"));
    let patchUrl = `${baseUrl}/${getId}`
    fetch(patchUrl, {
        method: "PATCH",
        body: JSON.stringify(updateObj),
        headers: {
            'content-type': 'application/json; charset="UTF-8"',
            'token': 'bearer token: movie token'
        }})
    updateMovie.style.display = "none";
    addMovieCard.style.display = "inline-block";
}

const onDelete = (e) => {
    let getId = e.getAttribute('data-target');
    let deleteUrl = `${baseUrl}/${getId}`
    fetch(deleteUrl , {method : "DELETE"})
}

function templating(arr) {
    let output = "";
    arr.forEach((ele) => {
        output += `<div class="col-sm-4">
                                <div class="card mt-4 shadow">
                                    <div class="card-body">
                                        <figure>
                                            <img src="${ele.image_url}" alt="" class="img-fluid">
                                            <figcaption>
                                                <h4 class="mt-2">${ele.title}</h4>
                                                <h5>Ratings:<span class="ml-2" id="rating">${ele.rating}</span></h5>
                                            </figcaption>
                                        </figure> 
                                        <button class="btn btn-info shadow" data-target = "${ele.id}" onclick = onEdit(this)>Edit</button>
                                        <button class="btn btn-danger shadow" data-target = "${ele.id}" onclick = onDelete(this)>Delete</button> 
                                        <button class="btn btn-success shadow" data-target = "${ele.id}" onclick = onWatchTrailer(this)>Watch Trailer</button>  
                                    </div>
                                </div> 
                            </div>`
    })
    movie_card.innerHTML = output;
}

btnAdd.addEventListener('click', onToggleHandler);
myClose.forEach((close) => {
    close.addEventListener('click', onToggleHandler);
});

addMovieCard.addEventListener('click', onClickAddMovie);
updateMovie.addEventListener('click', onClickUpdate);
fetchdata(baseUrl);
















// //edit & delete, update, modalDelete, watchTrailer Click Functions
// const onEdit = (e) => {
//     cl(e)
//     let getId = e.getAttribute('data-target');
//     cl(getId);
//     onToggleHandler();
//     updateMovie.style.display = "inline-block";
//     addMovieCard.style.display = "none";
//     let EditedArr = movieArray.find((std) => {
//         return std.id === getId
//     })
//     cl(EditedArr);
//     title.value = EditedArr.title;
//     image_url.value = EditedArr.image_url;
//     rating.value = EditedArr.rating;
//     trailer.value = EditedArr.trailer;
//     localStorage.setItem("MovieId", JSON.stringify(getId));
// }

// const onClickUpdate = () => {
//     let getId = JSON.parse(localStorage.getItem("MovieId"));
//     cl(getId);
//     movieArray.forEach((mov) => {
//         if(mov.id === getId){
//             cl(mov)
//             mov.title = title.value;
//             mov.url = image_url.value;
//             mov.rating = rating.value;
//             mov.trailer = trailer.value;
//             cl(mov);
//         }
//     })
//     localStorage.setItem("localMovieArray", JSON.stringify(movieArray));
//     templating();
//     title.value = "";
//     image_url.value = "";
//     rating.value = "";
//     trailer.value = "";
//     addMovieCard.style.display = "inline-block";
//     updateMovie.style.display = "none";
// }

// const onDelete = (e) => {
//     $('#myModal').modal()
//     let getId = e.getAttribute('data-target');
//     cl(getId);
//     localStorage.setItem("MovieId", JSON.stringify(getId));
// }

// const onClickModalDelete = () => {
//     let getId = JSON.parse(localStorage.getItem("MovieId"));
//     cl(getId);
//     let NewMoviearray = movieArray.filter(std => std.id !== getId);
//     cl(NewMoviearray);
//     movieArray = NewMoviearray;
//     localStorage.setItem("localMovieArray", JSON.stringify(movieArray));
//     templating();
// }

// const onWatchTrailer = (e) => {
//     let getId = e.getAttribute('data-target');
//     cl(getId);
//     let site = "";
//     movieArray.forEach((mov) => {
//         if(getId === mov.id){
//             site = mov.trailer
//         }
//         cl(site);
//     })
//     window.open(site, '_blank')
// }
// let movieArray = [];
// const onClickAddCard = () => {

//     movieArray.push(movieObj);
//     cl(movieArray);
//     localStorage.setItem("localMovieArray", JSON.stringify(movieArray));
//     templating();
//         title.value = "";
//         image_url.value = "";
//         rating.value = "";
//         trailer.value = "";

// }
// addMovieCard.addEventListener('click',onClickAddCard);
// updateMovie.addEventListener('click', onClickUpdate);
// modalDelete.addEventListener('click', onClickModalDelete);


// //templating function
// const templating = () => {
//     let template = "";
//     movieArray.forEach((mov) => {
//         template += `<div class="col-sm-4">
//                         <div class="card mt-4 shadow">
//                             <div class="card-body">
//                                 <figure>
//                                     <img src="${mov.url}" alt="" class="img-fluid">
//                                     <figcaption>
//                                         <h4 class="mt-2">${mov.title}</h4>
//                                         <h5>Ratings:<span class="ml-2" id="rating">${mov.rating}</span></h5>
//                                     </figcaption>
//                                 </figure>
//                                 <button class="btn btn-info shadow" data-target = "${mov.id}" onclick = onEdit(this)>Edit</button>
//                                 <button class="btn btn-danger shadow" data-target = "${mov.id}" onclick = onDelete(this)>Delete</button>
//                                 <button class="btn btn-success shadow" data-target = "${mov.id}" onclick = onWatchTrailer(this)>Watch Trailer</button>
//                             </div>
//                         </div>
//                     </div>`
//     })
//     movie_card.innerHTML = template;
// }

// if(localStorage.getItem("localMovieArray")){
//     movieArray = JSON.parse(localStorage.getItem("localMovieArray"));
//     templating();
// }
