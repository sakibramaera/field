"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDirection = void 0;
const graphql_1 = require("@nestjs/graphql");
var CustomerDirection;
(function (CustomerDirection) {
    CustomerDirection["asc"] = "asc";
    CustomerDirection["desc"] = "desc";
})(CustomerDirection = exports.CustomerDirection || (exports.CustomerDirection = {}));
(0, graphql_1.registerEnumType)(CustomerDirection, {
    name: 'CustomerDirection',
    description: 'Possible directions in which to order a list of items when provided an `orderBy` argument.',
});
//# sourceMappingURL=customer-direction.js.map