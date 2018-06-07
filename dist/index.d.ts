/**
 * Type declaration for a case condition function that receives the value to match against and returns a boolean
 */
declare type ConditionFunction = (value?: any) => boolean;
/**
 * Type declaration for a case value function that returns the desired value when a case is matched
 */
declare type ValueFunction = () => any;
/**
 * Casey class to handle the core logic.
 */
declare class Casey {
    private cases;
    private defaultValue;
    /**
     * Constructor
     *
     * @param {[ConditionFunction | any, ValueFunction | any][]} cases
     */
    constructor(cases?: [ConditionFunction | any, ValueFunction | any][]);
    /**
     * Provide am array of key, value arrays to batch add your cases
     *
     * @param {[ConditionFunction | any, ValueFunction | any][]} cases
     */
    map(cases: [ConditionFunction | any, ValueFunction | any][]): void;
    /**
     * Provide a condition value or function and a value to be returned when the condition result is truthy.
     *
     * @param {ConditionFunction | any} condition any
     * @param {ValueFunction | any} value any
     */
    case(condition: ConditionFunction | any, value: ValueFunction | any): Casey;
    /**
     * Provide a fallback default value for when no matches are found
     *
     * @param {ValueFunction | any} value The value to be returned when no match is found or a function that returns the desired default value.
     */
    default(value: ValueFunction | any): Casey;
    /**
     * Find a match to the configures cases and return the result.
     *
     * @param {any} value The value to match against or be given to your condition function for custom matching.
     */
    match(value?: any): any;
}
declare const _default: {
    map: (cases: [any, any][]) => Casey;
    case: (condition: any, value: any) => Casey;
    default: (value: any) => Casey;
};
export default _default;
