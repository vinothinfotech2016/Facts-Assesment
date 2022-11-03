import { Model } from "objection";
import { v4 as uuid } from "uuid";
import { removeUnwantedFields } from "./helper";
export type ModelConstructor<T extends Model = Model> = new (
  // eslint-disable-next-line no-unused-vars
  ...args: any[]
) => T;

export default function BaseModel() {
  return function <T extends ModelConstructor>(Base: T) {
    return class extends Base {
      // eslint-disable-next-line no-undef
      [x: string]: any;

      static get useLimitInFirst() {
        return true;
      }

      async validateFields() {
        // @ts-ignore
        removeUnwantedFields(this.constructor.jsonSchema, this);
      }

      async $beforeInsert(context: any) {
        await super.$beforeInsert(context);
        this.validateFields();
        this.id = this.id || uuid();
        this.createdAt = Date.now() / 100;
        // this.createdBy = context.userId;
        this.updatedAt = Date.now() / 100;
        // this.updatedBy = context.userId;
      }

      async $beforeUpdate(opt: any, context: any) {
        await super.$beforeUpdate(opt, context);
        this.validateFields();
        this.updatedAt = Date.now() / 100;
        this.updatedBy = context.userId;
        if (context.softDelete) {
          // updated soft delete related props
        } else if (context.undelete) {
          // updated soft delete related props on undelete action
        }
      }
    };
  };
}
