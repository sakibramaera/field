"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSalesmanDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_salesman_dto_1 = require("./create-salesman.dto");
class UpdateSalesmanDto extends (0, mapped_types_1.PartialType)(create_salesman_dto_1.CreateSalesmanDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateSalesmanDto = UpdateSalesmanDto;
//# sourceMappingURL=update-salesman.dto.js.map