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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesmanController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const salesman_service_1 = require("./salesman.service");
const create_salesman_dto_1 = require("./dto/create-salesman.dto");
const auth_model_1 = require("../auth/models/auth.model");
const graphql_1 = require("@nestjs/graphql");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
let SalesmanController = class SalesmanController {
    constructor(salesmanService) {
        this.salesmanService = salesmanService;
    }
    create(createSalesmanDto) {
        return this.salesmanService.createSalesman(createSalesmanDto);
    }
};
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => auth_model_1.Auth),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_salesman_dto_1.CreateSalesmanDto]),
    __metadata("design:returntype", void 0)
], SalesmanController.prototype, "create", null);
SalesmanController = __decorate([
    (0, common_1.Controller)('salesman'),
    __metadata("design:paramtypes", [salesman_service_1.SalesmanService])
], SalesmanController);
exports.SalesmanController = SalesmanController;
//# sourceMappingURL=salesman.controller.js.map