import { Model } from "objection";
import knex from "../../knex";
import BaseModel from "./BaseModel";
import Password from "objection-password";
import SoftDelete from "objection-js-soft-delete";

Model.knex(knex);

export { Model, BaseModel, Password, SoftDelete };
