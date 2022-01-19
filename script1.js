
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
    // Passo come parametri cellnumber per usare il ciclo della funzione createGrid per metterlo come testo dentro e 
    // cellsPerRow che serve per determinare la lunghezza e altezza della cella
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
    // Creo tutte le celle che mi servono con un ciclo for richiamando dentro al ciclo stesso la funzione per creare una singola cella,
    // poi la metto nella griglia e infine aggiungo l'evento che poi userò per triggerare il gameOver
    const createGrid = (griglia, columns, bombsList) => {
        for (let i = 1; i <= cellTot; i++) {
            const singleCell = createCell(i, columns);
            griglia.appendChild(singleCell);

            singleCell.addEventListener('click', (event) => onCellClick(event.target, bombsList, i));
        }
    }


    // Creo un numero casuale
    // Passo il numero massimo e minimo entro i quali devo generare il numero casuale 
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;



    // Creo una funzione per generare l'array delle bombe 
    // Passo come parametro il numero totale di bombe possibili, ovvero 16 e nel ciclo evoco la funzione per 
    // generare un numero casuale per generare 16 numeri casuali non ripetuti e li pusho nell'array del numero delle bombe.
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
    // Passo come parametri la lista delle bombe (bombList), il numero della cella (i), e prima di tutto la cella cliccata per
    // usarla quando evoco la funzione disableCell 
    const onCellClick = (clickedCell, bombsList, controlNumber) => {
        const cloneCell = disableCell(clickedCell, bombsList);

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
    // Passo come parametri isLoss che è un booleano che mi serve per capire se il gameover è triggerato da una bomba oppure 
    // il giocatore ha vinto, e poi la lista delle bombe per poi passarla all'evocazione della funzione showBombs
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
    // Passo come argomento la lista delle bombe per confrontare se il numero della cella è nella lista (e quindi è una bomba) e va 
    // mostrata.
    // In più seleziono tutte le celle con queryselectorAll con classe="cell" e 
    // evoco la funzione disableCell 
    const showBombs = (bombsList) => {
        const allCell = document.querySelectorAll(".cell");

        for (let i = 0; i < cellTot; i++) {
            const disabledCell = disableCell(allCell[i]);
            const cellNumber = parseInt(disabledCell.innerText);
            console.log(cellNumber);

            if (bombsList.includes(cellNumber)) {
                disabledCell.classList.add("bomb");
            }
        }
    }



    // Creo una funzione per creare una cella clone senza eventi 
    // Creo una nuova cella che sostituisco alla cella di prima per togliere tutti gli eventi associati.
    // Passo come parametri la cella di prima. 
    const disableCell = (cell) => {
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