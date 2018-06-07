"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Casey class to handle the core logic.
 */
var Casey = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {[ConditionFunction | any, ValueFunction | any][]} cases
     */
    function Casey(cases) {
        this.cases = [];
        if (cases) {
            this.map(cases);
        }
        this.defaultValue = function () { return undefined; };
        this.match = this.match.bind(this);
    }
    /**
     * Provide am array of key, value arrays to batch add your cases
     *
     * @param {[ConditionFunction | any, ValueFunction | any][]} cases
     */
    Casey.prototype.map = function (cases) {
        var _this = this;
        if (cases && cases.forEach && cases.length) {
            cases.forEach(function (c) { return _this.case(c[0], c[1]); });
        }
    };
    /**
     * Provide a condition value or function and a value to be returned when the condition result is truthy.
     *
     * @param {ConditionFunction | any} condition any
     * @param {ValueFunction | any} value any
     */
    Casey.prototype.case = function (condition, value) {
        var conditionFunc = typeof condition === "function"
            ? condition
            : typeof condition === "boolean"
                ? function (v) { return condition; }
                : function (v) { return v === condition; };
        var valueFunc = typeof value === "function" ? value : function () { return value; };
        this.cases.push({ condition: conditionFunc, value: valueFunc });
        return this;
    };
    /**
     * Provide a fallback default value for when no matches are found
     *
     * @param {ValueFunction | any} value The value to be returned when no match is found or a function that returns the desired default value.
     */
    Casey.prototype.default = function (value) {
        this.defaultValue = function () { return value; };
        return this;
    };
    /**
     * Find a match to the configures cases and return the result.
     *
     * @param {any} value The value to match against or be given to your condition function for custom matching.
     */
    Casey.prototype.match = function (value) {
        if (value === undefined) {
            return this.defaultValue();
        }
        var found = this.cases.find(function (c) {
            return c.condition(value);
        });
        return found ? found.value() : this.defaultValue();
    };
    return Casey;
}());
exports.default = {
    map: function (cases) {
        return new Casey(cases);
    },
    case: function (condition, value) {
        return new Casey([[condition, value]]);
    },
    default: function (value) {
        return new Casey().default(value);
    }
};
