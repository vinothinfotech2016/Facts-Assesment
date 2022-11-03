import { compose, RelationMappings } from "objection";
import { BaseModel, Model, Password } from "./mixins";
import { BASE_FIELDS, TYPES } from "../constants";
import AppRoles from "./AppRoles";
import Product from "./Product";
import ProductMenu from "./ProductMenu";

@BaseModel()
@Password({ allowEmptyPassword: false })
export default class AppUsers extends Model {
  static get tableName() {
    return "app_users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        ...BASE_FIELDS,
        id: TYPES.ID,
        name: TYPES.STRING,
        email: TYPES.EMAIL,
        productIds: TYPES.TEXT,
        password: TYPES.STRING,
        mobileNumber: TYPES.STRING,
        roleId: TYPES.ID,
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
      },
      menus: {
        relation: Model.HasManyRelation,
        modelClass: ProductMenu,
        join: {
          from: `${this.tableName}.id`,
          to: [
            "product_menu.createdBy",
            "product_menu.updatedBy",
          ],
        },
      },

      // product: {
      //   relation: Model.HasManyRelation,
      //   modelClass: Product,
      //   join: {
      //     from: `${this.tableName}.id`,
      //     to: `${Product.tableName}.createdBy`,
      //   },
      // },
      // productUpdatedBy: {
      //   relation: Model.HasManyRelation,
      //   modelClass: Product,
      //   join: {
      //     from: `${this.tableName}.id`,
      //     to: `${Product.tableName}.updatedBy`,
      //   },
      // },
    };
  }
}
