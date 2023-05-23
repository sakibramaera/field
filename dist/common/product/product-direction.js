"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDirection = void 0;
const graphql_1 = require("@nestjs/graphql");
var ProductDirection;
(function (ProductDirection) {
    ProductDirection["asc"] = "asc";
    ProductDirection["desc"] = "desc";
})(ProductDirection = exports.ProductDirection || (exports.ProductDirection = {}));
(0, graphql_1.registerEnumType)(ProductDirection, {
    name: 'ProductDirection',
    description: 'Possible directions in which to order a list of items when provided an `orderBy` argument.',
});
//# sourceMappingURL=product-direction.js.map