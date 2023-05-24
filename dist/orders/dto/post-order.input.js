"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostOrder = exports.PostOrderField = void 0;
const eager_import_0 = require("./post-order.input");
const graphql_1 = require("@nestjs/graphql");
const order_1 = require("../../common/order/order");
var PostOrderField;
(function (PostOrderField) {
    PostOrderField["id"] = "id";
    PostOrderField["createdAt"] = "createdAt";
    PostOrderField["updatedAt"] = "updatedAt";
    PostOrderField["product_name"] = "product_name";
    PostOrderField["quantity"] = "quantity";
    PostOrderField["weight"] = "weight";
    PostOrderField["customer"] = "customer";
    PostOrderField["delivery_date"] = "delivery_date";
})(PostOrderField = exports.PostOrderField || (exports.PostOrderField = {}));
(0, graphql_1.registerEnumType)(PostOrderField, {
    name: 'PostOrderField',
    description: 'Properties by which post connections can be ordered.',
});
let PostOrder = class PostOrder extends order_1.Order {
    static _GRAPHQL_METADATA_FACTORY() {
        return { field: { type: () => require("./post-order.input").PostOrderField } };
    }
};
PostOrder = __decorate([
    (0, graphql_1.InputType)()
], PostOrder);
exports.PostOrder = PostOrder;
//# sourceMappingURL=post-order.input.js.map