/* tslint:disable */
/* eslint-disable */
/**
 * LCT Hack Backend
 * Backend part for LCT Hack
 *
 * OpenAPI spec version: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { SubQueryCreate } from './sub-query-create';
/**
 * 
 * @export
 * @interface QueryCreate
 */
export interface QueryCreate {
    /**
     * Название запроса
     * @type {string}
     * @memberof QueryCreate
     */
    name?: string;
    /**
     * Ссылка на файл с входными данными
     * @type {string}
     * @memberof QueryCreate
     */
    inputFile: string;
    /**
     * Ссылка на файл с выходными данными
     * @type {string}
     * @memberof QueryCreate
     */
    outputFile?: string;
    /**
     * Список подзапросов
     * @type {Array<SubQueryCreate>}
     * @memberof QueryCreate
     */
    subQueries: Array<SubQueryCreate>;
    /**
     * Уникальный идентификатор пользователя, создавшего запись
     * @type {string}
     * @memberof QueryCreate
     */
    createdBy: string;
    /**
     * Уникальный идентификатор пользователя, обновившего запись
     * @type {string}
     * @memberof QueryCreate
     */
    updatedBy: string;
}