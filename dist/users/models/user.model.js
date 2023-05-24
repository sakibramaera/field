"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
require("reflect-metadata");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const order_model_1 = require("../../orders/models/order.model");
const base_model_1 = require("../../common/models/base.model");
const client_1 = require("@prisma/client");
const product_model_1 = require("../../products/models/product.model");
const customer_model_1 = require("../../customer/models/customer.model");
(0, graphql_1.registerEnumType)(client_1.Role, {
    name: 'Role',
    description: 'User role',
});
let User = class User extends base_model_1.BaseModel {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "mobile_no", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.Role, {}),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => [order_model_1.Order], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, graphql_1.Field)(() => [product_model_1.Product], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "products", void 0);
__decorate([
    (0, graphql_1.Field)(() => [customer_model_1.Customer], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "customer", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map