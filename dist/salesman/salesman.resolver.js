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
exports.SalesmanResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const salesman_service_1 = require("./salesman.service");
const salesman_entity_1 = require("./entities/salesman.entity");
const create_salesman_input_1 = require("./dto/create-salesman.input");
const update_salesman_input_1 = require("./dto/update-salesman.input");
let SalesmanResolver = class SalesmanResolver {
    constructor(salesmanService) {
        this.salesmanService = salesmanService;
    }
    createSalesman(createSalesmanInput) {
        return this.salesmanService.create(createSalesmanInput);
    }
    findAll() {
        return this.salesmanService.findAll();
    }
    findOne(id) {
        return this.salesmanService.findOne(id);
    }
    updateSalesman(updateSalesmanInput) {
        return this.salesmanService.update(updateSalesmanInput.id, updateSalesmanInput);
    }
    removeSalesman(id) {
        return this.salesmanService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => salesman_entity_1.Salesman),
    __param(0, (0, graphql_1.Args)('createSalesmanInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_salesman_input_1.CreateSalesmanInput]),
    __metadata("design:returntype", void 0)
], SalesmanResolver.prototype, "createSalesman", null);
__decorate([
    (0, graphql_1.Query)(() => [salesman_entity_1.Salesman], { name: 'salesman' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SalesmanResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => salesman_entity_1.Salesman, { name: 'salesman' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalesmanResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => salesman_entity_1.Salesman),
    __param(0, (0, graphql_1.Args)('updateSalesmanInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_salesman_input_1.UpdateSalesmanInput]),
    __metadata("design:returntype", void 0)
], SalesmanResolver.prototype, "updateSalesman", null);
__decorate([
    (0, graphql_1.Mutation)(() => salesman_entity_1.Salesman),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalesmanResolver.prototype, "removeSalesman", null);
SalesmanResolver = __decorate([
    (0, graphql_1.Resolver)(() => salesman_entity_1.Salesman),
    __metadata("design:paramtypes", [salesman_service_1.SalesmanService])
], SalesmanResolver);
exports.SalesmanResolver = SalesmanResolver;
//# sourceMappingURL=salesman.resolver.js.map