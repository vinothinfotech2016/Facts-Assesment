import { compose, RelationMappings } from "objection";
import { BaseModel, Model } from "./mixins";
import { BASE_FIELDS, TYPES } from "../constants";
import ProductMenu from "./ProductMenu";
import Users from "./Users";
import AppUsers from "./AppUsers";
import ScreenMaster from "./ScreenMaster";
import LevelOneMenu from "./LevelOneMenu";
import MenuFlow from "./MenuFlow";

@BaseModel()
export default class LevelTwoMenu extends Model {
  static get tableName() {
    return "level_two_menu";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        ...BASE_FIELDS,
        id: TYPES.ID,
        name: TYPES.STRING,
        levelOneId: TYPES.ID,
        createdAt: TYPES.INTEGER,
        updatedAt: TYPES.INTEGER
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
      level_one_menu: {
        relation: Model.HasManyRelation,
        modelClass: LevelOneMenu,
        join: {
          from: `${this.tableName}.levelOneId`,
          to: `${LevelOneMenu.tableName}.id`,
        },
      },
      menu_flow: {
        relation: Model.HasManyRelation,
        modelClass: MenuFlow,
        join: {
          from: `${this.tableName}.id`,
          to: `${MenuFlow.tableName}.levelTwoId`,
        },
      }
    };
  }
}
