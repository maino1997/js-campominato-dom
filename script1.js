const goBtn = document.getElementById("start");



goBtn.addEventListener('click', () => {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    let wh = parseInt(document.getElementById('choices').value);
    let cellTot = wh * wh;
    let totBomb = 16;
    let attempts = 0;
    let maxAttempts = cellTot - totBomb;


    // console.log(cellTot);

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
        cell.append(cellNumber + 1);

        return cell;
    }


    // Creo la griglia con tutte le celle 

    const createGrid = (griglia, wh) => {
        for (let i = 0; i < cellTot; i++) {
            const singleCell = createCell(i, wh);
            griglia.appendChild(singleCell);

            singleCell.addEventListener('click', (event) => onCellClick(event.target, bombs, i));
        }
    }


    // Creo un numero casuale
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;



    // Creo una funzione per generare l'array delle bombe 
    const getBombs = (totalBomb) => {
        const bombs = [];
        while (bombs.length < totalBomb) {
            const rdnNum = getRandomNumber(1, cellTot);
            bombs.push(rdnNum);
        }
        return bombs;
    }






    // Creo una funzione per controllare al click se ho cliccato su una bomba e se si avvio il game over 
    const onCellClick = (clickedCell, bombsList, controlNumber) => {
        if (bombsList.includes(controlNumber)) {
            gameOver(true);
            clickedCell.classList.add("bomb");

        } else {
            clickedCell.classList.add("safe");
            attempts++;
            if (attempts == maxAttempts) {
                gameOver(false);
            }
        }
    }


    // Creo funzione gameover 
    const gameOver = (isLoss) => {
        const newElement = document.createElement('h2');
        if (isLoss) {
            newElement.innerText = "Hai perso, rigioca";
        } else {
            newElement.innerText = "Hai vinto, rigioca";
        }

        grid.appendChild(newElement);
    }















    const bombs = getBombs(totBomb);
    createGrid(grid, wh);


});