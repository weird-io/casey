/**
 * Interface declares the structure needed for a case.
 */
interface Case {
    condition: (value: any) => boolean;
    value: () => any;
}

/**
 * Casey class to handle the core logic.
 */
class Casey {
    private cases: Case[] = [];
    private defaultValue: () => any;

    constructor(cases?: [any, any][]) {
        if (cases) {
            cases.forEach((c) => this.case(c[0], c[1]));
        }
    }

    public case(condition: any, value: any): Casey {
        const conditionFunc = typeof condition === "function"
            ? condition
            : typeof condition === "boolean"
                ? (v) => condition
                : (v) => v === condition;
        const valueFunc = typeof value === "function"
            ? value
            : () => value;

        this.cases.push({ condition: conditionFunc, value: valueFunc });
        return this;
    }

    public default(value: any): Casey {
        this.defaultValue = () => value;
        return this;
    }

    public match(value?: any): any {
        if (value === undefined) {
            return this.defaultValue();
        }
        const found = this.cases.find((c) => {
            return c.condition(value)
        });
        return found 
            ? found.value() 
            : this.defaultValue();
    }
}

export default {
    "case": (condition: any, value: any): Casey => {
        return new Casey([[condition, value]]);
    },
    "default": (value: any): Casey => {
        return (new Casey()).default(value);
    }
}