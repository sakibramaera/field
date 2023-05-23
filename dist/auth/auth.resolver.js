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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const auth_model_1 = require("./models/auth.model");
const token_model_1 = require("./models/token.model");
const login_input_1 = require("./dto/login.input");
const signup_input_1 = require("./dto/signup.input");
const refresh_token_input_1 = require("./dto/refresh-token.input");
const user_model_1 = require("../users/models/user.model");
let AuthResolver = class AuthResolver {
    constructor(auth) {
        this.auth = auth;
    }
    async signup(data) {
        data.email = data.email.toLowerCase();
        const { accessToken, refreshToken } = await this.auth.createUser(data);
        return {
            accessToken,
            refreshToken,
        };
    }
    async login({ email, password }) {
        const { accessToken, refreshToken } = await this.auth.login(email.toLowerCase(), password);
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshToken({ token }) {
        return this.auth.refreshToken(token);
    }
    async user(auth) {
        return await this.auth.getUserFromToken(auth.accessToken);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => auth_model_1.Auth),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_input_1.SignupInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signup", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_model_1.Auth),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => token_model_1.Token),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_input_1.RefreshTokenInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "refreshToken", null);
__decorate([
    (0, graphql_1.ResolveField)('user', () => user_model_1.User),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_model_1.Auth]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "user", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(() => auth_model_1.Auth),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map