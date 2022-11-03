import { compose, RelationMappings } from "objection";
import { BaseModel, Model } from "./mixins";
import { BASE_FIELDS, TYPES } from "../constants";
import Product from "./Product";
import ProductMenu from "./ProductMenu";
import ScreenMaster from "./ScreenMaster";
import LevelOneMenu from "./LevelOneMenu";
import LevelTwoMenu from "./LevelTwoMenu";


@BaseModel()
export default class MenuFlow extends Model {
  static get tableName() {
    return "menu_flow";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        ...BASE_FIELDS,
        id: TYPES.ID,
        productId: TYPES.ID,
        menuId: TYPES.ID,
        levelOneId: TYPES.ID,
        levelTwoId: TYPES.ID,
        screenId: TYPES.ID,
        createdAt: TYPES.INTEGER,
        updatedAt: TYPES.INTEGER
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
          product_menu: {
            relation: Model.HasManyRelation,
            modelClass: ProductMenu,
            join: {
              from: `${this.tableName}.menuId`,
              to: `${ProductMenu.tableName}.id`,
            },
          },
          level_one_menu: {
            relation: Model.HasManyRelation,
            modelClass: LevelOneMenu,
            join: {
              from: `${this.tableName}.levelOneId`,
              to: `${LevelOneMenu.tableName}.id`,
            },
          },
          level_two_menu: {
            relation: Model.HasManyRelation,
            modelClass: LevelTwoMenu,
            join: {
              from: `${this.tableName}.levelTwoId`,
              to: `${LevelTwoMenu.tableName}.id`,
            },
          },
          screen_master: {
            relation: Model.HasManyRelation,
            modelClass: ScreenMaster,
            join: {
              from: `${this.tableName}.screenId`,
              to: `${ScreenMaster.tableName}.id`,
            },
          }
    };
  }
}
