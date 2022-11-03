import { compose, RelationMappings } from "objection";
import { BaseModel, Model } from "./mixins";
import { BASE_FIELDS, TYPES } from "../constants";
import Users from "./Users";
import AppUsers from "./AppUsers";

@BaseModel()
export default class AppRoles extends Model {
  static get tableName() {
    return "app_roles";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        ...BASE_FIELDS,
        id: TYPES.ID,
        role: TYPES.STRING,
        accessMenus: TYPES.STRING,
        createdAt: TYPES.INTEGER,
        updatedAt: TYPES.INTEGER,
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: AppUsers,
        join: {
          from: `${this.tableName}.id`,
          to: `${AppUsers.tableName}.roleId`,
        },
      },
    };
  }
}
