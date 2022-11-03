import { compose, RelationMappings } from "objection";
import { BaseModel, Model } from "./mixins";
import { BASE_FIELDS, TYPES } from "../constants";

@BaseModel()
export default class ScreenType extends Model {
  static get tableName() {
    return "screen_type";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        ...BASE_FIELDS,
        id: TYPES.ID,
        name: TYPES.STRING,
      },
    };
  }
  static get relationMappings(): RelationMappings {
    return {};
  }
}
