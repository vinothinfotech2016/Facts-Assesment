"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUnwantedFields = void 0;
function removeUnwantedFields(jsonschema, data) {
    const fields = jsonschema.properties
        ? Object.keys(jsonschema.properties)
        : [];
    Object.keys(data).map((key) => {
        if (!fields.includes(key)) {
            delete data[key];
        }
    });
}
exports.removeUnwantedFields = removeUnwantedFields;
//# sourceMappingURL=helper.js.map