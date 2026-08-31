import { shuffleArray } from "../utils/utils";
import Box from "./box";

class Game {
    #rows;
    #cols;
    #idElement;
    #boxes;
    #open;
    timer;

    constructor(rows, cols, idElement="game") {
        this.rows = rows;
        this.cols = cols;
        this.idElement = idElement;
        this.#boxes = [];
        this.#open = false;

        this.createBox();
        this.paintBox();

        console.log(`Se creo un objeto`);

        this.element.addEventListener('click', () => {
            this.checkOpenBoxes();
        });
    }

    get cols() {
        return this.#cols;
    }

    get rows() {
        return this.#rows;
    }

    checkOpenBoxes() {
        let numberOpenBox = this.#boxes.filter((box) => box.open && box.free);

        if (numberOpenBox.length == 2) {
            if (numberOpenBox[0].color === numberOpenBox[1].color) {
                numberOpenBox.map((box) => {
                    box.free = false;
                });

                this.arrayBoxToLocalStorage();
            }
        } else {
            setTimeOut(() => {
                numberOpenBox.map((box) => {
                    box.open = true;
                });
            }, 500);
        }
    }

    checkFinishGame() {
        let freeBox = this.#boxes.filter(box => box.free);

        if (freeBox.length === 0) {
            setTimeout(() => {
                this.timer.stop();

                alert(`Juego finalizado`);
            }, 500);
        }
    }

    createRandomColors() {
        let randomColors = [];

        for (let index = 0; index < (this.$cols * this.#rows) / 2; index++) {
            let red = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);

            let color = `rgb(${red}, ${green}, ${blue})`;

            randomColors.push(color);
        }

        randomColors = [...randomColors, ...randomColors];

        shuffle(randomColors);

        return randomColors;
    }

    createBox() {
        if (localStorage.getItem('boxes' !== null)) {
            let boxFromLocalStorage = localStorage.getItem('box');

            boxFromLocalStorage.map(box => {
                let newBox = new Box(box.row, box.col, box.color);
            });

        } else {

            let randomColors = this.createRandomColors();
            let arrayBoxToLocalStorage = [];

            for (let row = 0; row < this.#rows; row++) {
                for (let col = 0; col < this.#cols; col++) {
                    let color = randomColors.shift();

                    arrayColorsToLocalStorage.push({
                        'row': row,
                        'col': col,
                        'color': color
                    });

                    let newBox = new Box(row, col);

                    this.#boxes.push(newBox);
                }
            }
        }


        this.arrayBoxToLocalStorage();
    }

    arrayBoxToLocalStorage() {
        let arrayBoxToLocalStorage = this.#boxes.map(box => {
            return {
                row: box.row,
                col: box.col,
                color: box.color,
                free: box.free,
                open: box.open
            }
        });

        localStorage.setItem('boxes', JSON.stringify(arrayBoxToLocalStorage));
    }

    paintBox() {
        let header = document.createElement('header');
        this.element.appendChild(header);

        let boxContainer = document.createElement('div');
        boxContainer.setAttribute('id', 'boxContainer');

        this.element.appendChild(boxContainer);

        this.setCSSBoxTemplates();

        this.#boxes.map((box) => {
            let newBoxDiv = document.createElement('div');

            newBoxDiv.classList.add('box');

            if (!box.free || box.open) {
                box.style.backgroundColor = box.color;
            }

            newBoxDiv.dataset.col = box.col;
            newBoxDiv.dataset.row = box.row;

            box.element = newBoxDiv;

            box.addEventClick();

            boxContainer.appendChild(newBoxDiv);
        });
    }

    initTimer() {
        let timerContainer = document.createElement('h2');
        timerContainer.innerHTML = '<h2> <span id="timer"> 00:00:00 </span> </h2>';

        let header = document.getElementById('boxHeader');
        header.appendChild(timer);

        let timer = new Timer();
    }

    setCSSBoxTemplates() {
        this.element.style.gridTemplateColumns = `repeat($this.cols), 1fr)`;
        this.element.style.gridTemplateRows = `repeat($this.rows), 1fr)`;
    }

    static getRowsCols() {

        let rows, cols;

        if (localStorage.getItem('rows') !== null && localStorage.getItem('cols') !== null) {
            rows = parseInt(localStorage.getItem('rows'));
            cols = parseInt(localStorage.getItem('cols'));
        } else {
            let rows = parseInt(prompt(`Ingresa un numero de filas`));
            let cols = parseInt(prompt(`Ingresa un numero de columnas`));

            while (rows*cols % 2 !== 0) {
                alert(`El numero de cartas debe ser par`);

                rows = parseInt(prompt(`Ingresa el numero de filas`));
                cols = parseInt(prompt(`Ingresa el numero de columnas`));
            }

            localStorage('rows', rows);
            localStorage('cols', cols);
        }

        return {
            rows: rows,
            cols: cols,
        };
    }

    static resetGame() {
        localStorage.removeItem('cols');
        localStorage.removeItem('rows');

        location.reload();
    }
}

export default Box;