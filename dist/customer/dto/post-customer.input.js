"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCustomer = exports.PostCustomerField = void 0;
const eager_import_0 = require("./post-customer.input");
const graphql_1 = require("@nestjs/graphql");
const customer_1 = require("../../common/customer/customer");
var PostCustomerField;
(function (PostCustomerField) {
    PostCustomerField["id"] = "id";
    PostCustomerField["createdAt"] = "createdAt";
    PostCustomerField["updatedAt"] = "updatedAt";
    PostCustomerField["published"] = "published";
    PostCustomerField["name"] = "name";
    PostCustomerField["address"] = "address";
    PostCustomerField["mobile_number"] = "mobile_number";
})(PostCustomerField = exports.PostCustomerField || (exports.PostCustomerField = {}));
(0, graphql_1.registerEnumType)(PostCustomerField, {
    name: 'PostCustomerField',
    description: 'Properties by which post connections can be ordered.',
});
let PostCustomer = class PostCustomer extends customer_1.Customer {
    static _GRAPHQL_METADATA_FACTORY() {
        return { field: { type: () => require("./post-customer.input").PostCustomerField } };
    }
};
PostCustomer = __decorate([
    (0, graphql_1.InputType)()
], PostCustomer);
exports.PostCustomer = PostCustomer;
//# sourceMappingURL=post-customer.input.js.map