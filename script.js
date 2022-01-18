// L'utente indica TRAMITE DOM un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
//  in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.


// Creo una funzione per creare 100 celle con un ciclo che parte da 1 e finisce a 100, uso lo stesso ciclo per
// prendere la i e metterla come id alla cella appena creata.

let bombNumber = 16;

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

    const rdnNumber = (max, min) => {
        const rdnNum = Math.floor(Math.random() * (max - min) + 1) - min;
        return rdnNum;
    }

    const bombs = [];

    const getBombs = (userChoice, bombs) => {
        while (bombs.length < 16) {
            const randomNum = rdnNumber(userChoice, 1);
            if (!bombs.includes(randomNum)) {
                bombs.push(randomNum);
            }
        }
        return bombs;
    }

    console.log(getBombs(userChoice, bombs));

    const singleCell = (i, docGrid, cellmax, bombs) => {
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

        if (bombs.includes(i)) {
            newCell.classList.add("bomb");
            console.log(i);
        }


        docGrid.appendChild(newCell);
        return newCell;
    }


    const createCell = (cellmax) => {
        grid.innerHTML = "";
        for (let i = 1; i <= cellmax; i++) {

            const cell = singleCell(i, grid, userChoice, bombs);


            cell.addEventListener('click', () => {
                cell.classList.toggle("bg-blue");
            });

        }
    }




    console.log(rdnNumber(userChoice, 1));





    // console.log(getBombs(userChoice, bombs));




    const addBombClass = (userChoice, bombsList, newCell) => {
        const allCells = document.querySelectorAll(".cell");


        for (let i = 0; i < userChoice; i++) {

        }
    }

    console.log(addBombClass(userChoice, bombs, createCell(userChoice, grid)));








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




    createCell(userChoice);

});
