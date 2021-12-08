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

const onToggleHandler = () => {
    myModal.classList.toggle('visible');
    backdrop.classList.toggle('visible');
}
btnAdd.addEventListener('click', onToggleHandler);
myClose.forEach((close) => {
    close.addEventListener('click', onToggleHandler);
});

//edit & delete, update, modalDelete, watchTrailer Click Functions
const onEdit = (e) => {
    // cl(e)
    let getId = e.getAttribute('data-target');
    cl(getId);
    onToggleHandler();
    updateMovie.style.display = "inline-block";
    addMovieCard.style.display = "none";
    let EditedArr = movieArray.find((std) => {
        return std.id === getId
    })
    cl(EditedArr);
    title.value = EditedArr.title;
    image_url.value = EditedArr.url;
    rating.value = EditedArr.rating;
    trailer.value = EditedArr.trailer;
    localStorage.setItem("MovieId", JSON.stringify(getId));
}

const onClickUpdate = () => {
    let getId = JSON.parse(localStorage.getItem("MovieId"));
    cl(getId);
    movieArray.forEach((mov) => {
        if(mov.id === getId){
            cl(mov)
            mov.title = title.value;
            mov.url = image_url.value;
            mov.rating = rating.value;
            mov.trailer = trailer.value;
            cl(mov);
        }
    })
    localStorage.setItem("localMovieArray", JSON.stringify(movieArray));
    templating();
    title.value = "";
    image_url.value = "";
    rating.value = "";
    trailer.value = "";
    addMovieCard.style.display = "inline-block";
    updateMovie.style.display = "none";
}

const onDelete = (e) => {
    $('#myModal').modal()
    let getId = e.getAttribute('data-target'); 
    cl(getId);
    localStorage.setItem("MovieId", JSON.stringify(getId));
}

const onClickModalDelete = () => {
    let getId = JSON.parse(localStorage.getItem("MovieId"));
    cl(getId);
    let NewMoviearray = movieArray.filter(std => std.id !== getId);
    cl(NewMoviearray);
    movieArray = NewMoviearray; 
    localStorage.setItem("localMovieArray", JSON.stringify(movieArray));
    templating();
}

const onWatchTrailer = (e) => {
    let getId = e.getAttribute('data-target');
    cl(getId);
    let site = "";
    movieArray.forEach((mov) => {
        if(getId === mov.id){
            site = mov.trailer
        }
        cl(site);
    })
    window.open(site, '_blank')
}
let movieArray = [];
const onClickAddCard = () => {
    let movieObj = {
        title: title.value,
        url: image_url.value,
        rating: rating.value,
        trailer: trailer.value,
        id: uuidv4()
    }
    movieArray.push(movieObj);
    cl(movieArray);
    localStorage.setItem("localMovieArray", JSON.stringify(movieArray));
    templating();
        title.value = "";
        image_url.value = "";
        rating.value = "";
        trailer.value = "";

}
addMovieCard.addEventListener('click',onClickAddCard);
updateMovie.addEventListener('click', onClickUpdate);
modalDelete.addEventListener('click', onClickModalDelete);

//uuid generator
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
//templating function
const templating = () => {
    let template = "";
    movieArray.forEach((mov) => {
        template += `<div class="col-sm-4">
                        <div class="card mt-4 shadow">
                            <div class="card-body">
                                <figure>
                                    <img src="${mov.url}" alt="" class="img-fluid">
                                    <figcaption>
                                        <h4 class="mt-2">${mov.title}</h4>
                                        <h5>Ratings:<span class="ml-2" id="rating">${mov.rating}</span></h5>
                                    </figcaption>
                                </figure> 
                                <button class="btn btn-info shadow" data-target = "${mov.id}" onclick = onEdit(this)>Edit</button>
                                <button class="btn btn-danger shadow" data-target = "${mov.id}" onclick = onDelete(this)>Delete</button> 
                                <button class="btn btn-success shadow" data-target = "${mov.id}" onclick = onWatchTrailer(this)>Watch Trailer</button>  
                            </div>
                        </div> 
                    </div>`
    })
    movie_card.innerHTML = template;
}

if(localStorage.getItem("localMovieArray")){
    movieArray = JSON.parse(localStorage.getItem("localMovieArray"));
    templating();
}