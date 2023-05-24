"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostProduct = exports.PostProductField = void 0;
const eager_import_0 = require("./post-product.input");
const graphql_1 = require("@nestjs/graphql");
const product_1 = require("../../common/product/product");
var PostProductField;
(function (PostProductField) {
    PostProductField["id"] = "id";
    PostProductField["createdAt"] = "createdAt";
    PostProductField["updatedAt"] = "updatedAt";
    PostProductField["productName"] = "productName";
    PostProductField["maker"] = "maker";
    PostProductField["productWeight"] = "productWeight";
    PostProductField["category"] = "category";
    PostProductField["mfgDate"] = "mfgDate";
    PostProductField["expDate"] = "expDate";
})(PostProductField = exports.PostProductField || (exports.PostProductField = {}));
(0, graphql_1.registerEnumType)(PostProductField, {
    name: 'PostProductField',
    description: 'Properties by which post connections can be ordered.',
});
let PostProduct = class PostProduct extends product_1.Product {
    static _GRAPHQL_METADATA_FACTORY() {
        return { field: { type: () => require("./post-product.input").PostProductField } };
    }
};
PostProduct = __decorate([
    (0, graphql_1.InputType)()
], PostProduct);
exports.PostProduct = PostProduct;
//# sourceMappingURL=post-product.input.js.map