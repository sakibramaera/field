"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerConnection = void 0;
const graphql_1 = require("@nestjs/graphql");
const pagination_1 = require("../../common/pagination/pagination");
const customer_model_1 = require("./customer.model");
let CustomerConnection = class CustomerConnection extends (0, pagination_1.default)(customer_model_1.Customer) {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
CustomerConnection = __decorate([
    (0, graphql_1.ObjectType)()
], CustomerConnection);
exports.CustomerConnection = CustomerConnection;
//# sourceMappingURL=customer-connection.model.js.map