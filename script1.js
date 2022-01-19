
const goBtn = document.getElementById("start");



goBtn.addEventListener('click', () => {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    const select = document.getElementById('choices');
    let columns;

    switch (select.value) {
        case "2":
            columns = 9;
            break;
        case "3":
            columns = 7;
            break;
        default:
            columns = 10;
            break;
    }


    let cellTot = columns * columns;
    let totBomb = 16;
    let attempts = 0;
    let maxAttempts = cellTot - totBomb;


    // Creo una cella 
    const createCell = (cellNumber, cellsPerRow) => {
        const cell = document.createElement('div');
        if (cellsPerRow === 10) {
            cellsPerRow = `calc(100% / ${cellsPerRow})`;
        } else if (cellsPerRow === 9) {
            cellsPerRow = `calc(100% / ${cellsPerRow})`;
        } else {
            cellsPerRow = `calc(100% / ${cellsPerRow})`;
        }

        cell.style.height = cellsPerRow;
        cell.style.width = cellsPerRow;
        cell.classList.add("cell");
        cell.append(cellNumber);

        return cell;
    }


    // Creo la griglia con tutte le celle 

    const createGrid = (griglia, wh, bombsList) => {
        for (let i = 1; i <= cellTot; i++) {
            const singleCell = createCell(i, wh);
            griglia.appendChild(singleCell);

            singleCell.addEventListener('click', (event) => onCellClick(event.target, bombsList, i));
        }
    }


    // Creo un numero casuale
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;



    // Creo una funzione per generare l'array delle bombe 
    const getBombs = (totalBomb) => {
        const bombs = [];
        while (bombs.length < totalBomb) {
            const rdnNum = getRandomNumber(1, cellTot);
            if (!bombs.includes(rdnNum)) {
                bombs.push(rdnNum);
            }
        }
        return bombs;
    }






    // Creo una funzione per controllare al click se ho cliccato su una bomba e se si avvio il game over 
    const onCellClick = (clickedCell, bombsList, controlNumber) => {
        const cloneCell = disableCell(clickedCell, bombsList);
        cloneCell.removeEventListener('click', onCellClick);

        if (bombsList.includes(controlNumber)) {
            gameOver(true, bombsList);
            cloneCell.classList.add("bomb");
        } else {
            cloneCell.classList.add("safe");
            attempts++;
            if (attempts == maxAttempts) {
                gameOver(false, bombsList);
            }
        }
    }


    // Creo funzione gameover 
    const gameOver = (isLoss, bombsList) => {
        const newElement = document.createElement('h2');
        showBombs(bombsList);
        if (isLoss) {
            newElement.innerText = "Hai perso, rigioca";
        } else {
            newElement.innerText = `Hai vinto con un punteggio di ${attempts}`;
        }

        grid.appendChild(newElement);
    }




    // Creo una funzione per mostrare tutte le bombe 
    const showBombs = (bombsList) => {
        const allCell = document.querySelectorAll(".cell");

        for (let i = 0; i < cellTot; i++) {
            const disabledCell = disableCell(allCell[i], bombsList);
            const cellNumber = parseInt(disabledCell.innerText);
            console.log(cellNumber);

            if (bombsList.includes(cellNumber)) {
                disabledCell.classList.add("bomb");
            }
        }
    }


    // Creo una funzione per creare una cella clone senza eventi 
    const disableCell = (cell, bombsList) => {
        const clone = cell.cloneNode();
        clone.innerText = cell.innerText;
        cell.parentNode.replaceChild(clone, cell);
        return clone;
    }





    //--------- ESECUZIONE DEL PROGRAMMA ---------- 

    const bombs = getBombs(totBomb);
    console.log(bombs);
    createGrid(grid, columns, bombs);


});