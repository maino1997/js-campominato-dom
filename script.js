// L'utente indica TRAMITE DOM un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
//  in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.


// Creo una funzione per creare 100 celle con un ciclo che parte da 1 e finisce a 100, uso lo stesso ciclo per
// prendere la i e metterla come id alla cella appena creata.
const createCell = (cellmax, docGrid) => {
    grid.innerHTML = "";
    for (let i = 1; i <= cellmax; i++) {
        const newCell = document.createElement('div');
        newCell.append(i);
        newCell.classList.add("cell");
        newCell.id = (i);

        if (cellmax == 100) {
            newCell.classList.add("cell-10");
        } else if (cellmax == 81) {
            newCell.classList.add("cell-8");
        } else {
            newCell.classList.add("cell-5");
        }

        newCell.addEventListener('click', () => {
            newCell.classList.toggle("bg-blue");
        });

        docGrid.appendChild(newCell);
    }
}


// const getIdNumber = (min, max) => {
//     const idList = [];
//     let cellId = 0;

//     for (let i = min; i <= min + max; i++) {
//         cellId = i;
//         idList.push(cellId);
//     }
//     console.log(idList);
//     return idList;
// }


const userLevel = document.getElementById("select");
const genBtn = document.getElementById("generate");
const grid = document.getElementById("grid-container");


genBtn.addEventListener('click', () => {
    let userChoice = userLevel.value;
    if (userChoice === "1") {
        userChoice = 100;
    } else if (userChoice === "2") {
        userChoice = 81;
    } else {
        userChoice = 49;
    }



    createCell(userChoice, grid);

});
