
      import { compose, RelationMappings } from "objection";
      import { BaseModel, Model } from "./mixins";
      import { BASE_FIELDS, TYPES } from "../constants";
      import Product from "./Product";
import ScreenMaster from "./ScreenMaster";

      @BaseModel()
      export default class CommentsReply extends Model {
        static get tableName() {
          return "comments_reply";
        }

        static get jsonSchema() {
          return {
            type: "object",
            properties: {
              ...BASE_FIELDS,
              id: TYPES.ID,
              screenId: TYPES.ID,
              comments: TYPES.TEXT,
              reply: TYPES.TEXT,
              commentBy: TYPES.STRING,
              repliedBy: TYPES.STRING,
              createdAt: TYPES.INTEGER,
              updatedAt: TYPES.INTEGER
            },
          };
        }

        static get relationMappings(): RelationMappings {
          return {
              screen_master: {
                  relation: Model.HasManyRelation,
                  modelClass: Product,
                  join: {
                    from: `${this.tableName}.screenId`,
                    to: `${ScreenMaster.tableName}.id`,
                  },
                }
          };
        }
      }
