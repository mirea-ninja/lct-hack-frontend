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
 * @interface AdjustmentPatch
 */
export interface AdjustmentPatch {
    /**
     * Корректировка на торг
     * @type {number}
     * @memberof AdjustmentPatch
     */
    trade?: number;
    /**
     * Корректировка на этаж
     * @type {number}
     * @memberof AdjustmentPatch
     */
    floor?: number;
    /**
     * Корректировка на площадь квартиры
     * @type {number}
     * @memberof AdjustmentPatch
     */
    aptArea?: number;
    /**
     * Корректировка на площадь кухни
     * @type {number}
     * @memberof AdjustmentPatch
     */
    kitchenArea?: number;
    /**
     * Корректировка на наличие балкона
     * @type {number}
     * @memberof AdjustmentPatch
     */
    hasBalcony?: number;
    /**
     * Корректировка на удаленность от метро
     * @type {number}
     * @memberof AdjustmentPatch
     */
    distanceToMetro?: number;
    /**
     * Корректировка на отделку
     * @type {number}
     * @memberof AdjustmentPatch
     */
    quality?: number;
    /**
     * Цена после корректировки на торг
     * @type {number}
     * @memberof AdjustmentPatch
     */
    priceTrade?: number;
    /**
     * Цена после корректировки на торг
     * @type {number}
     * @memberof AdjustmentPatch
     */
    priceFloor?: number;
    /**
     * Цена после корректировки на площадь
     * @type {number}
     * @memberof AdjustmentPatch
     */
    priceArea?: number;
    /**
     * Цена после корректировки на площадь кухни
     * @type {number}
     * @memberof AdjustmentPatch
     */
    priceKitchen?: number;
    /**
     * Цена после корректировки на наличие балкона
     * @type {number}
     * @memberof AdjustmentPatch
     */
    priceBalcony?: number;
    /**
     * Цена после корректировки на удаленность от метро
     * @type {number}
     * @memberof AdjustmentPatch
     */
    priceMetro?: number;
    /**
     * Цена после корректировки на отделку
     * @type {number}
     * @memberof AdjustmentPatch
     */
    priceFinal?: number;
}