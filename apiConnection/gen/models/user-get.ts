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
/**
 * 
 * @export
 * @interface UserGet
 */
export interface UserGet {
    /**
     * Email адрес пользователя
     * @type {string}
     * @memberof UserGet
     */
    email: string;
    /**
     * Имя пользователя
     * @type {string}
     * @memberof UserGet
     */
    firstName: string;
    /**
     * Фамилия пользователя
     * @type {string}
     * @memberof UserGet
     */
    lastName: string;
    /**
     * Отчество пользователя(при наличии)
     * @type {string}
     * @memberof UserGet
     */
    middleName?: string;
    /**
     * Уникальный идентификатор пользователя
     * @type {string}
     * @memberof UserGet
     */
    guid: string;
    /**
     * Пароль пользователя
     * @type {string}
     * @memberof UserGet
     */
    password: string;
    /**
     * Время создания пользователя
     * @type {Date}
     * @memberof UserGet
     */
    createdAt: Date;
    /**
     * Время последнего обновления пользователя
     * @type {Date}
     * @memberof UserGet
     */
    updatedAt: Date;
}