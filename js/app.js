const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
const listCursos = document.querySelector('#lista-carrito tbody');

//if you wanted to remove all subjects there is anothoher method
//const deleteAllSubjects = document.getElementById('vaciar-carrito');
//then after that just put an event listener with the const created...

initEventListeners();
addingLocalStorageToCart();

function initEventListeners() {

    //event listener when someone clicks a subject
    cursos.addEventListener('click', comprar);

    //event listener when a subject will be deleted
    carrito.addEventListener('click', deleteValue);

    //event listener when someone wants to delete all the subjects on the cart
    carrito.addEventListener('click', deleteAllValues);

    //reloading a page for localStorage
    document.addEventListener('DOMContentLoader', obtainLocalStorage);


}

function comprar(e) {
    e.preventDefault();

    //If someone clicks on agregar al carrito it will select the corresponding subject
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;

        readValue(curso);
    }
}

function readValue(curso) {

    //getting the values of the subject selected
    const infoCurso = {
        image: curso.querySelector('img').src,
        title: curso.querySelector('h4').textContent,
        value: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    duplicatesFunction(infoCurso);

}

function duplicatesFunction(newCurso) {

    let cursosArr = obtainLocalStorage();

    let cont = 0;
    for (curso of cursosArr) {
        if (curso.id != newCurso.id) {
            cont = cont + 1;
        }
    };


    if (cont == cursosArr.length) {
        insertValuetoCart(newCurso);
        //adding to local storage
        addToLocalStorage(newCurso);
    }else{
        alert('No puedes agregar el mismo curso dos veces');
    }
}

//Inserts a subject to the cart table
function insertValuetoCart(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.image}" width=100>
        </td>
        <td>${curso.title} </td>
        <td>${curso.value} </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}" >
            X</a>
        </td>
    `;
    listCursos.appendChild(row);

}

function deleteValue(e) {

    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {
        deleteSubjectFromLocalStorage(e.target.parentElement.parentElement.querySelector('a').getAttribute('data-id'));
        e.target.parentElement.parentElement.remove();
    }
}

function deleteAllValues(e) {
    e.preventDefault();
    if (e.target.id == 'vaciar-carrito') {

        //listCursos.innerHTML = ``;  //Slow Method

        //Fast method
        while (listCursos.firstChild) {
            listCursos.removeChild(listCursos.firstChild);
        }

        localStorage.setItem('cursos', JSON.stringify([]));
    }


}

function addToLocalStorage(curso) {

    let cursosLocalStorage;

    cursosLocalStorage = obtainLocalStorage();

    cursosLocalStorage.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursosLocalStorage));

}

function obtainLocalStorage() {

    let cursosLocalStorage;

    if (localStorage.length == 0) {
        cursosLocalStorage = new Array();
    } else {
        cursosLocalStorage = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLocalStorage;

}

function addingLocalStorageToCart() {
    let cursosLocalStorage = obtainLocalStorage();
    if (cursosLocalStorage != null) {
        cursosLocalStorage.forEach(curso => insertValuetoCart(curso));
    }
}

function deleteSubjectFromLocalStorage(id) {
    let cursosArr = obtainLocalStorage();

    cursosArr.forEach(function (curso, index) {
        if (curso.id == id) {
            cursosArr.splice(index, 1);
            localStorage.setItem('cursos', JSON.stringify(cursosArr));
        }
    });

}