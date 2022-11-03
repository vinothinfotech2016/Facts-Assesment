import { compose, RelationMappings } from "objection";
import { BaseModel, Model } from "./mixins";
import { BASE_FIELDS, TYPES } from "../constants";
import ProductMenu from "./ProductMenu";
import AppUsers from "./AppUsers";
import ScreenMaster from "./ScreenMaster";

@BaseModel()
export default class Product extends Model {
  static get tableName() {
    return "product";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        ...BASE_FIELDS,
        id: TYPES.ID,
        name: TYPES.STRING,
        description: TYPES.STRING,
        leftLogoUrl: TYPES.TEXT,
        rightLogoUrl: TYPES.TEXT,
        centerLogoUrl: TYPES.TEXT,
        centerLogoText: TYPES.TEXT,
        status: TYPES.STRING,
        inActiveReason: TYPES.TEXT,
        effectiveDate: TYPES.STRING,
        createdBy: TYPES.ID,
        updatedBy: TYPES.ID,
        createdAt: TYPES.INTEGER,
        updatedAt: TYPES.INTEGER
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
      productMenu: {
        relation: Model.HasManyRelation,
        modelClass: ProductMenu,
        join: {
          from: `${this.tableName}.id`,
          to: `${ProductMenu.tableName}.productId`,
        },
      },
      screen_master: {
        relation: Model.HasManyRelation,
        modelClass: ScreenMaster,
        join: {
          from: `${this.tableName}.id`,
          to: `${ScreenMaster.tableName}.productId`,
        },
      },
      users: {
        relation: Model.HasManyRelation,
        modelClass: AppUsers,
        join: {
          from: [`${this.tableName}.createdBy`, `${this.tableName}.updatedBy`],
          to: `${AppUsers.tableName}.id`,
        },
      }
    };
  }
}
