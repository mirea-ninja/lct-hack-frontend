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
import { ApartmentBase } from './apartment-base';
/**
 * 
 * @export
 * @interface SubQueryCreate
 */
export interface SubQueryCreate {
    /**
     * Список квартир в подзапросе
     * @type {Array<ApartmentBase>}
     * @memberof SubQueryCreate
     */
    inputApartments?: Array<ApartmentBase>;
    /**
     * Эталонный объект
     * @type {ApartmentBase}
     * @memberof SubQueryCreate
     */
    standartObject?: ApartmentBase;
    /**
     * Список подобранных аналогов
     * @type {Array<ApartmentBase>}
     * @memberof SubQueryCreate
     */
    analogs?: Array<ApartmentBase>;
    /**
     * Список выбранных аналогов
     * @type {Array<ApartmentBase>}
     * @memberof SubQueryCreate
     */
    selectedAnalogs?: Array<ApartmentBase>;
    /**
     * Список корректировок для аналогов
     * @type {Array<AdjustmentGet>}
     * @memberof SubQueryCreate
     */
    adjustmentsAnalogCalculated?: Array<AdjustmentGet>;
    /**
     * Список корректировок для аналогов, исправленных пользователем
     * @type {Array<AdjustmentGet>}
     * @memberof SubQueryCreate
     */
    adjustmentsAnalogUser?: Array<AdjustmentGet>;
    /**
     * Список корректировок для пула
     * @type {Array<AdjustmentGet>}
     * @memberof SubQueryCreate
     */
    adjustmentsPoolCalculated?: Array<AdjustmentGet>;
    /**
     * Список корректировок для пула, исправленных пользователем
     * @type {Array<AdjustmentGet>}
     * @memberof SubQueryCreate
     */
    adjustmentsPoolUser?: Array<AdjustmentGet>;
    /**
     * Список выходных квартир
     * @type {Array<ApartmentBase>}
     * @memberof SubQueryCreate
     */
    outputApartments?: Array<ApartmentBase>;
}
