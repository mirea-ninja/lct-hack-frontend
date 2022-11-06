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
 * @interface AdjustmentGet
 */
export interface AdjustmentGet {
    /**
     * Корректировка на торг
     * @type {number}
     * @memberof AdjustmentGet
     */
    trade: number;
    /**
     * Корректировка на этаж
     * @type {number}
     * @memberof AdjustmentGet
     */
    floor: number;
    /**
     * Корректировка на площадь квартиры
     * @type {number}
     * @memberof AdjustmentGet
     */
    aptArea: number;
    /**
     * Корректировка на площадь кухни
     * @type {number}
     * @memberof AdjustmentGet
     */
    kitchenArea: number;
    /**
     * Корректировка на наличие балкона
     * @type {number}
     * @memberof AdjustmentGet
     */
    hasBalcony: number;
    /**
     * Корректировка на удаленность от метро
     * @type {number}
     * @memberof AdjustmentGet
     */
    distanceToMetro: number;
    /**
     * Корректировка на отделку
     * @type {number}
     * @memberof AdjustmentGet
     */
    quality: number;
    /**
     * Цена после корректировки на торг
     * @type {number}
     * @memberof AdjustmentGet
     */
    priceTrade: number;
    /**
     * Цена после корректировки на торг
     * @type {number}
     * @memberof AdjustmentGet
     */
    priceFloor: number;
    /**
     * Цена после корректировки на площадь
     * @type {number}
     * @memberof AdjustmentGet
     */
    priceArea: number;
    /**
     * Цена после корректировки на площадь кухни
     * @type {number}
     * @memberof AdjustmentGet
     */
    priceKitchen: number;
    /**
     * Цена после корректировки на наличие балкона
     * @type {number}
     * @memberof AdjustmentGet
     */
    priceBalcony: number;
    /**
     * Цена после корректировки на удаленность от метро
     * @type {number}
     * @memberof AdjustmentGet
     */
    priceMetro: number;
    /**
     * Цена после корректировки на отделку
     * @type {number}
     * @memberof AdjustmentGet
     */
    priceFinal: number;
    /**
     * Уникальный идентификатор квартиры, для которой проводилась корректировка автоматически
     * @type {string}
     * @memberof AdjustmentGet
     */
    guid: string;
}
