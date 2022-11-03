import { compose, RelationMappings } from "objection";
import { BaseModel, Model } from "./mixins";
import { BASE_FIELDS, TYPES } from "../constants";
import Product from "./Product";
import LevelOneMenu from "./LevelOneMenu";
import AppUsers from "./AppUsers";

@BaseModel()
export default class ProductMenu extends Model {
  static get tableName() {
    return "product_menu";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        ...BASE_FIELDS,
        id: TYPES.ID,
        productId: TYPES.ID,
        name: TYPES.STRING,
        orderNo: TYPES.INTEGER,
        effectiveDate: TYPES.STRING,
        subMenus: TYPES.TEXT,
        displayType: TYPES.STRING,
        menuParams: TYPES.STRING,
        status: TYPES.STRING,
        inActiveReason: TYPES.TEXT,
        createdAt: TYPES.INTEGER,
        updatedAt: TYPES.INTEGER,
        createdBy: TYPES.ID,
        updatedBy: TYPES.ID,
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: `${this.tableName}.productId`,
          to: `${Product.tableName}.id`,
        },
      },
      level_one_menu: {
        relation: Model.HasManyRelation,
        modelClass: LevelOneMenu,
        join: {
          from: `${this.tableName}.id`,
          to: `${LevelOneMenu.tableName}.menuId`,
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
