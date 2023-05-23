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
exports.CreatePostInput = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let CreatePostInput = class CreatePostInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "product", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "quantity", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "delivery_date", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "delivery_location", void 0);
CreatePostInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePostInput);
exports.CreatePostInput = CreatePostInput;
//# sourceMappingURL=createPost.input.js.map