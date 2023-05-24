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
exports.SignupInput = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
let SignupInput = class SignupInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignupInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], SignupInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SignupInput.prototype, "firstname", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SignupInput.prototype, "lastname", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SignupInput.prototype, "mobile_no", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.Role, { nullable: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupInput.prototype, "role", void 0);
SignupInput = __decorate([
    (0, graphql_1.InputType)()
], SignupInput);
exports.SignupInput = SignupInput;
//# sourceMappingURL=signup.input.js.map