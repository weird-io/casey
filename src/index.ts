/**
 * Interface declares the structure needed for a case.
 */
interface Case {
    condition: (value: any) => boolean;
    value: () => any;
}

/**
 * Static initialisation functions.
 */
export class casey {
    public static case(condition: any, value: any): Casey {
        const c = new Casey();
        return c.case(condition, value);
    }

    public static default(value: any): Casey {
        const c = new Casey();
        return c.default(value);
    }
}

/**
 * Casey class to handle the core logic.
 */
export class Casey {
    private cases: Case[] = [];
    private defaultValue: () => any;

    constructor(cases?: [(value: any) => boolean | boolean | any, () => any | any][]) {
        cases.forEach((c) => this.case(c[0], c[1]));
    }

    public case(condition: (value: any) => boolean | boolean | any, value: () => any | any): Casey {
        condition = typeof(condition) === "function"
            ? condition
            : typeof(condition === "boolean")
                ? (c) => condition
                : (c) => c === condition;
        value = typeof(value) === "function"
            ? value
            : () => value;
        this.cases.push({ condition, value });
        return this;
    }

    public default(value: any): Casey {
        this.defaultValue = () => value();
        return this;
    }

    public match(value: any): any {
        return this.cases.find((c) => c.condition(value)).value()
    }
}
