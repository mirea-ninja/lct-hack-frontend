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
import { AdjustmentGet } from './adjustment-get';
/**
 * 
 * @export
 * @interface ApartmentGet
 */
export interface ApartmentGet {
    /**
     * Адрес квартиры
     * @type {string}
     * @memberof ApartmentGet
     */
    address: string;
    /**
     * Ссылка на объявление
     * @type {string}
     * @memberof ApartmentGet
     */
    link?: string;
    /**
     * Широта
     * @type {number}
     * @memberof ApartmentGet
     */
    lat?: number;
    /**
     * Долгота
     * @type {number}
     * @memberof ApartmentGet
     */
    lon?: number;
    /**
     * Количество комнат
     * @type {number}
     * @memberof ApartmentGet
     */
    rooms: number;
    /**
     * Тип жилья
     * @type {string}
     * @memberof ApartmentGet
     */
    segment: string;
    /**
     * Количество этажей
     * @type {number}
     * @memberof ApartmentGet
     */
    floors: number;
    /**
     * Материал стен
     * @type {string}
     * @memberof ApartmentGet
     */
    walls?: string;
    /**
     * Этаж
     * @type {number}
     * @memberof ApartmentGet
     */
    floor: number;
    /**
     * Площадь квартиры
     * @type {number}
     * @memberof ApartmentGet
     */
    apartmentArea: number;
    /**
     * Площадь кухни
     * @type {number}
     * @memberof ApartmentGet
     */
    kitchenArea?: number;
    /**
     * Наличие балкона
     * @type {boolean}
     * @memberof ApartmentGet
     */
    hasBalcony?: boolean;
    /**
     * Расстояние до метро
     * @type {number}
     * @memberof ApartmentGet
     */
    distanceToMetro?: number;
    /**
     * Отделка
     * @type {string}
     * @memberof ApartmentGet
     */
    quality?: string;
    /**
     * Цена за квадратный метр
     * @type {number}
     * @memberof ApartmentGet
     */
    m2price?: number;
    /**
     * Цена квартиры
     * @type {number}
     * @memberof ApartmentGet
     */
    price?: number;
    /**
     * Список корректировок
     * @type {AdjustmentGet}
     * @memberof ApartmentGet
     */
    adjustment?: AdjustmentGet;
    /**
     * Уникальный идентификатор квартиры
     * @type {string}
     * @memberof ApartmentGet
     */
    guid: string;
}
