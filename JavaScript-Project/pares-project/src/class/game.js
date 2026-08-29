import { shuffleArray } from "../utils/utils";
import Box from "./box";

class Game {
    #rows;
    #cols;
    #idElement;
    #boxes;
    #open;

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
        let numberOpenBox = this.#boxes.filter((box) => box.open);

        if (numberOpenBox.length == 2) {
            if (numberOpenBox[0].color === numberOpenBox[1].color) {
                numberOpenBox.map((box) => {
                    box.free = false;
                });
            }
        } else {
            setTimeOut(() => {
                numberOpenBox.map((box) => {
                    box.open = true;
                });
            });
        }

        console.log(numberOpenBox);
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
        let randomColors = this.createRandomColors();

        for (let row = 0; row < this.#rows; row++) {
            for (let col = 0; col < this.#cols; col++) {
                let color = randomColors.shift();
                let newBox = new Box(row, col);
            }
        }
    }

    paintBox() {
        this.setCSSBoxTemplates();

        this.#boxes.map((box) => {
            let newBoxDiv = document.createElement('div');

            newBoxDiv.classList.add('box');
            newBoxDiv.dataset.col = box.col;
            newBoxDiv.dataset.row = box.row;

            box.element = newBoxDiv;

            box.addEventClick();

            this.element.appendChild(newBoxDiv);
        });
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