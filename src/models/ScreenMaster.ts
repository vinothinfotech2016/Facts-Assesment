import { compose, RelationMappings } from "objection";
import { BaseModel, Model } from "./mixins";
import { BASE_FIELDS, TYPES } from "../constants";
import Product from "./Product";
import MenuFlow from "./MenuFlow";
import AppUsers from "./AppUsers";


@BaseModel()
export default class ScreenMaster extends Model {
  static get tableName() {
    return "screen_master";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        ...BASE_FIELDS,
        id: TYPES.ID,
        productId: TYPES.ID,
        screenNumber: TYPES.STRING,
        screenName: TYPES.TEXT,
        screenDescription: TYPES.TEXT,
        screenTypeId: TYPES.ID,
        screenComplexityId: TYPES.ID,
        screenImageUrl: TYPES.TEXT,
        developerNotes: TYPES.TEXT,
        status: TYPES.STRING,
        effectiveDate: TYPES.STRING,
        inActiveReason: TYPES.TEXT,
        actionItems: TYPES.TEXT,
        createdAt: TYPES.INTEGER,
        updatedAt: TYPES.INTEGER,
        createdBy: TYPES.ID,
        updatedBy: TYPES.ID
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
        product: {
            relation: Model.HasManyRelation,
            modelClass: Product,
            join: {
              from: `${this.tableName}.productId`,
              to: `${Product.tableName}.id`,
            },
          },
          menu_flow: {
            relation: Model.HasManyRelation,
            modelClass: MenuFlow,
            join: {
              from: `${this.tableName}.id`,
              to: `${MenuFlow.tableName}.screenId`,
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
