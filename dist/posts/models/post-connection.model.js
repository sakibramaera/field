"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostConnection = void 0;
const graphql_1 = require("@nestjs/graphql");
const pagination_1 = require("../../common/pagination/pagination");
const post_model_1 = require("./post.model");
let PostConnection = class PostConnection extends (0, pagination_1.default)(post_model_1.Post) {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
PostConnection = __decorate([
    (0, graphql_1.ObjectType)()
], PostConnection);
exports.PostConnection = PostConnection;
//# sourceMappingURL=post-connection.model.js.map