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
exports.Customer = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("../../users/models/user.model");
const base_model_1 = require("../../common/models/base.model");
let Customer = class Customer extends base_model_1.BaseModel {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    __metadata("design:type", String)
], Customer.prototype, "mobile_number", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, {}),
    __metadata("design:type", Boolean)
], Customer.prototype, "published", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_model_1.User, { nullable: true }),
    __metadata("design:type", user_model_1.User)
], Customer.prototype, "author", void 0);
Customer = __decorate([
    (0, graphql_1.ObjectType)()
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=customer.model.js.map