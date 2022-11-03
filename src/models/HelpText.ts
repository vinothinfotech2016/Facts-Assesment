import { compose, RelationMappings } from "objection";
import { BaseModel, Model } from "./mixins";
import { BASE_FIELDS, TYPES } from "../constants";

@BaseModel()
export default class HelpText extends Model {
  static get tableName() {
    return "help_text";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        ...BASE_FIELDS,
        id: TYPES.INTEGER,
        helpText: TYPES.STRING,
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {};
  }
}
