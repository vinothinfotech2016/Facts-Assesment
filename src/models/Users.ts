import { compose, RelationMappings } from "objection";
import { BaseModel, Model, Password } from "./mixins";
import { BASE_FIELDS, TYPES } from "../constants";
import AppRoles from "./AppRoles";
import Product from "./Product";

@BaseModel()
@Password({ allowEmptyPassword: false })
export default class Users extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        ...BASE_FIELDS,
        id: TYPES.ID,
        name: TYPES.STRING,
        email: TYPES.EMAIL,
        products: TYPES.STRING,
        password: TYPES.STRING,
        mobileNumber: TYPES.STRING,
        address: TYPES.STRING,
        userId: TYPES.STRING,
        state: TYPES.STRING,
        district: TYPES.STRING,
        roleId: TYPES.ID,
        pincode: TYPES.STRING,
        createdAt: TYPES.INTEGER,
        updatedAt: TYPES.INTEGER,
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: AppRoles,
        join: {
          from: `${this.tableName}.roleId`,
          to: `${AppRoles.tableName}.id`,
        },
      }
    };
  }
}
