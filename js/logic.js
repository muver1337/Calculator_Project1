import { print } from './utils/print.js'

class Calculation {
    constructor() {
        this.temp = ''
        this.result = 0
    }
    
    operators(char) {
        return /[+\-*\/]/.test(char);
    }

    compute(str) {
        return new Function(`return ${str}`)();
    }

    output() {
        print(this.temp || this.result.toString());
    }

    summa(number)  {
        this.temp += number;
        this.output();
    }

    operatorsAdd(operators) {
        if (this.temp === '' && this.result !== 0) {
            this.temp = this.result.toString();
        }

        else if (!this.operators(this.temp.slice(-1))) {
            this.temp += ` ${operators} `;
            this.output();
        }
        return this;
    }

    calculate() {
        this.Resultad = this.compute(this.temp.replaceAll('x', '*'));
        if (isFinite(this.Resultad)) {
            this.result = this.Resultad;
            this.temp = '';
            this.output();
        } else {
            this.result = 'Ошибка';
        }
    }

    clear() {
        this.temp = '';
        this.result = 0;
        this.output();
        return this;
    }

    deleteLastSymbol() {
        this.temp = this.temp.slice(0, -1);
        this.output();
        return this;
    }
}

const main = () => {
    const calculator = new Calculation();

    return (state) => {
        if (state === 'С') {
            calculator.clear();
        } else if (state === 'АС') {
            calculator.deleteLastSymbol();
        } else if (state === '=') {
            calculator.calculate();
        } else {
            if (/\d|\./.test(state)) {
                calculator.summa(state);
            } else if (/[+\-x/]/.test(state)) {
                calculator.operatorsAdd(state);
            }
        }
    }
};

export default main