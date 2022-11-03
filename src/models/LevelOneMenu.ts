import { compose, RelationMappings } from "objection";
import { BaseModel, Model } from "./mixins";
import { BASE_FIELDS, TYPES } from "../constants";
import ProductMenu from "./ProductMenu";
import Users from "./Users";
import AppUsers from "./AppUsers";
import ScreenMaster from "./ScreenMaster";
import LevelTwoMenu from "./LevelTwoMenu";
import MenuFlow from "./MenuFlow";

@BaseModel()
export default class LevelOneMenu extends Model {
  static get tableName() {
    return "level_one_menu";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        ...BASE_FIELDS,
        id: TYPES.ID,
        name: TYPES.STRING,
        orderNo: TYPES.INTEGER,
        menuId: TYPES.ID,
        createdAt: TYPES.INTEGER,
        updatedAt: TYPES.INTEGER
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
      level_two_menu: {
        relation: Model.HasManyRelation,
        modelClass: LevelTwoMenu,
        join: {
          from: `${this.tableName}.id`,
          to: `${LevelTwoMenu.tableName}.levelOneId`,
        },
      },
      menu_flow: {
        relation: Model.HasManyRelation,
        modelClass: MenuFlow,
        join: {
          from: `${this.tableName}.id`,
          to: `${MenuFlow.tableName}.levelOneId`,
        },
      },
      product_menu: {
        relation: Model.HasManyRelation,
        modelClass: ProductMenu,
        join: {
          from: `${this.tableName}.menuId`,
          to: `${ProductMenu.tableName}.id`,
        },
      },
    };
  }
}
