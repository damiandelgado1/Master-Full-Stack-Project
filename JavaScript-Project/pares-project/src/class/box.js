class Box {
    #col;
    #row;
    #color;
    #free;
    #open;
    #element;

    constructor(col, row, color, free=true, open=false) {
        this.#col = col;
        this.#row = row;
        this.#color = color;
        this.#free = true;
        this.#open = false;
    }

    get col() {
        return this.#col;
    }

    get row() {
        return this.#row;
    }

    get open() {
        return this.#open;
    }

    get free() {
        return this.#free;
    }

    get color() {
        return this.#color;
    }

    set element(element) {
        this.#element = element;
    }

    set free(newValue) {
        this.#free = newValue;
    }

    addEventClick() {
        if (this.#element) {
            this.#element.addEventListener('click', (e) => {
                if (this.#free) {
                    this.#element.style.backgroundColor = this.#color;
                    this.#open = true;

                    console.log(e.target);
                }

                return false;
            });
        }
    }

    resetColor() {
        this.#element.backgroundColor = 'black';
        this.open = false;
    }
}

export default Box;