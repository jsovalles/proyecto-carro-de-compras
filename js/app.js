const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
const listCursos = document.querySelector('#lista-carrito tbody');

//if you wanted to remove all subjects there is anothoher method
//const deleteAllSubjects = document.getElementById('vaciar-carrito');
//then after that just put an event listener with the const created...

initEventListeners();
addingLocalStorageToCart();
totalValueSubjects();

function initEventListeners() {

    //event listener when someone clicks a subject
    cursos.addEventListener('click', comprar);

    //event listener when a subject will be deleted
    carrito.addEventListener('click', deleteValue);

    //event listener when someone wants to delete all the subjects on the cart
    carrito.addEventListener('click', deleteAllValues);

    //reloading a page for localStorage
    document.addEventListener('DOMContentLoader', obtainLocalStorage);

    //total value
    document.addEventListener('click', totalValueSubjects);

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

    //disabling the buttom
    disablingButtom(curso);

}

function duplicatesFunction(newCurso) {

    let cursosArr = obtainLocalStorage();

    let result = cursosArr.map(({ id }) => id); //Making an array with only the id of the current subjects

    if (!result.includes(newCurso.id)) {
        insertValuetoCart(newCurso);
        //adding to local storage
        addToLocalStorage(newCurso);
    } else {
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

        //activate buttom if subject is deleted
        activeButtom(e.target.parentElement.parentElement.querySelector('a').getAttribute('data-id'));

        deleteSubjectFromLocalStorage(e.target.parentElement.parentElement.querySelector('a').getAttribute('data-id'));

        //deleting total value
        totalValueSubjects();

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

        activateAllButtoms();
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

function totalValueSubjects() {
    let cursosLocalStorage = JSON.parse(localStorage.getItem('cursos'));
    if (cursosLocalStorage.length != 0) {
        cursosLocalStorage = JSON.parse(localStorage.getItem('cursos'));
        let result = cursosLocalStorage.map(({ value }) => Number(value.substring(1, value.length))); //Making an array with only the value (without currency)
        let resultArr = result.reduce((a, b) => { return a + b; })
        const row = document.createElement('tr');
        row.setAttribute("id", "total-id");
        row.innerHTML = `
        <td>Total:</td>
        <td></td>
        <td></td>
        <td>$${resultArr}</td>
        `;
        while (listCursos.querySelector('#total-id') != null) {
            listCursos.querySelector('#total-id').remove();
        }
        listCursos.appendChild(row);
    }

}

function disablingButtom(curso) {
    curso.querySelector('a').setAttribute("disabled", "disabled");
}

function activeButtom(id) {
    let rows = Array.from(cursos.querySelectorAll('.row'));
    let ans = rows.forEach(element => {
        let ansArr = Array.from(element.children);
        ansArr.forEach(e => {
            let idElement = e.querySelector('a').getAttribute('data-id');
            if (idElement == id) {
                e.querySelector('a').removeAttribute('disabled');
            }

        })
    })
}

function activateAllButtoms() {
    let rows = Array.from(cursos.querySelectorAll('.row'));
    let ans = rows.forEach(element => {
        let ansArr = Array.from(element.children);
        ansArr.forEach(e => {
            e.querySelector('a').removeAttribute('disabled');
        })
    })
}