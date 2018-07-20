/**
 * Type declaration for a case condition function that receives the value to match against and returns a boolean
 */
type ConditionFunction = ( value?: any ) => boolean;

/**
 * Type declaration for a case value function that returns the desired value when a case is matched
 */
type ValueFunction = () => any;

/**
 * Interface declares the structure needed for a case.
 */
interface Case {
  condition: ( value: any ) => boolean;
  value: () => any;
}

/**
 * Casey class to handle the core logic.
 */
class Casey {
  private cases: Case[] = [];
  private defaultValue: () => any;

  /**
   * Constructor
   *
   * @param {[ConditionFunction | any, ValueFunction | any][]} cases
   */
  constructor( cases?: [ConditionFunction | any, ValueFunction | any][] ) {
    if (cases) {
      this.map(cases);
    }
    this.defaultValue = () => undefined;
    this.match = this.match.bind(this);
  }

  /**
   * Provide am array of key, value arrays to batch add your cases
   *
   * @param {[ConditionFunction | any, ValueFunction | any][]} cases
   */
  public map( cases: [ConditionFunction | any, ValueFunction | any][] ) {
    if (cases && cases.forEach && cases.length) {
      cases.forEach(c => this.case(c[0], c[1]));
    }
  }

  /**
   * Provide a condition value or function and a value to be returned when the condition result is truthy.
   *
   * @param {ConditionFunction | any} condition any
   * @param {ValueFunction | any} value any
   */
  public case(
    condition: ConditionFunction | any,
    value: ValueFunction | any
  ): Casey {
    const conditionFunc =
      typeof condition === "function"
        ? condition
        : typeof condition === "boolean"
        ? ( v: any ) => condition
        : ( v: any ) => v === condition;
    const valueFunc = typeof value === "function" ? value : () => value;

    this.cases.push({ condition: conditionFunc, value: valueFunc });
    return this;
  }

  /**
   * Provide a fallback default value for when no matches are found
   *
   * @param {ValueFunction | any} value The value to be returned when no match is found or a function that returns the desired default value.
   */
  public default( value: ValueFunction | any ): Casey {
    this.defaultValue = () => value;
    return this;
  }

  /**
   * Find a match to the configures cases and return the result.
   *
   * @param {any} value The value to match against or be given to your condition function for custom matching.
   */
  public match( value?: any ): any {
    if (value === undefined) {
      return this.defaultValue();
    }
    const found = this.cases.find(( c: Case ) => {
      return c.condition(value);
    });
    return found ? found.value() : this.defaultValue();
  }
}

const instance = {
  map: ( cases: [ConditionFunction | any, ValueFunction | any][] ): Casey => {
    return new Casey(cases);
  },
  case: (
    condition: ConditionFunction | any,
    value: ValueFunction | any
  ): Casey => {
    return new Casey([[condition, value]]);
  },
  default: ( value: ValueFunction | any ): Casey => {
    return new Casey().default(value);
  }

};

export = instance;
