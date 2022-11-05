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
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { HTTPValidationError } from '../models';
import { QueryCreate } from '../models';
import { QueryGet } from '../models';
import { QueryPatch } from '../models';
/**
 * QueryApi - axios parameter creator
 * @export
 */
export const QueryApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Удалить запрос по его id
         * @summary Удаление запрос по id
         * @param {string} id Id запроса
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteQueryIdDelete: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteQueryIdDelete.');
            }
            const localVarPath = `/query/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication HTTPBearer required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Получить список всех запросов
         * @summary Получение всех запросов
         * @param {number} [limit] 
         * @param {number} [offset] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllQueryGet: async (limit?: number, offset?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/query`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication HTTPBearer required

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (offset !== undefined) {
                localVarQueryParameter['offset'] = offset;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Получить запрос по его id
         * @summary Получение запрос по id
         * @param {string} id Id запроса
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getQueryIdGet: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getQueryIdGet.');
            }
            const localVarPath = `/query/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication HTTPBearer required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Изменить запрос по его id (частичное обновление модели)
         * @summary Изменение запрос по id (только указанные поля будут изменены)
         * @param {QueryPatch} body 
         * @param {string} id Id запроса
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        patchQueryIdPatch: async (body: QueryPatch, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling patchQueryIdPatch.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling patchQueryIdPatch.');
            }
            const localVarPath = `/query/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication HTTPBearer required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Изменить запрос по его id (полное обновление модели)
         * @summary Изменение запрос по id
         * @param {QueryCreate} body 
         * @param {string} id Id запроса
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateQueryIdPut: async (body: QueryCreate, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateQueryIdPut.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling updateQueryIdPut.');
            }
            const localVarPath = `/query/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication HTTPBearer required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * QueryApi - functional programming interface
 * @export
 */
export const QueryApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Удалить запрос по его id
         * @summary Удаление запрос по id
         * @param {string} id Id запроса
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteQueryIdDelete(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await QueryApiAxiosParamCreator(configuration).deleteQueryIdDelete(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Получить список всех запросов
         * @summary Получение всех запросов
         * @param {number} [limit] 
         * @param {number} [offset] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllQueryGet(limit?: number, offset?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<QueryGet>>>> {
            const localVarAxiosArgs = await QueryApiAxiosParamCreator(configuration).getAllQueryGet(limit, offset, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Получить запрос по его id
         * @summary Получение запрос по id
         * @param {string} id Id запроса
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getQueryIdGet(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<QueryGet>>> {
            const localVarAxiosArgs = await QueryApiAxiosParamCreator(configuration).getQueryIdGet(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Изменить запрос по его id (частичное обновление модели)
         * @summary Изменение запрос по id (только указанные поля будут изменены)
         * @param {QueryPatch} body 
         * @param {string} id Id запроса
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async patchQueryIdPatch(body: QueryPatch, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<QueryGet>>> {
            const localVarAxiosArgs = await QueryApiAxiosParamCreator(configuration).patchQueryIdPatch(body, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Изменить запрос по его id (полное обновление модели)
         * @summary Изменение запрос по id
         * @param {QueryCreate} body 
         * @param {string} id Id запроса
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateQueryIdPut(body: QueryCreate, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<QueryGet>>> {
            const localVarAxiosArgs = await QueryApiAxiosParamCreator(configuration).updateQueryIdPut(body, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * QueryApi - factory interface
 * @export
 */
export const QueryApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Удалить запрос по его id
         * @summary Удаление запрос по id
         * @param {string} id Id запроса
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteQueryIdDelete(id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return QueryApiFp(configuration).deleteQueryIdDelete(id, options).then((request) => request(axios, basePath));
        },
        /**
         * Получить список всех запросов
         * @summary Получение всех запросов
         * @param {number} [limit] 
         * @param {number} [offset] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllQueryGet(limit?: number, offset?: number, options?: AxiosRequestConfig): Promise<AxiosResponse<Array<QueryGet>>> {
            return QueryApiFp(configuration).getAllQueryGet(limit, offset, options).then((request) => request(axios, basePath));
        },
        /**
         * Получить запрос по его id
         * @summary Получение запрос по id
         * @param {string} id Id запроса
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getQueryIdGet(id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<QueryGet>> {
            return QueryApiFp(configuration).getQueryIdGet(id, options).then((request) => request(axios, basePath));
        },
        /**
         * Изменить запрос по его id (частичное обновление модели)
         * @summary Изменение запрос по id (только указанные поля будут изменены)
         * @param {QueryPatch} body 
         * @param {string} id Id запроса
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async patchQueryIdPatch(body: QueryPatch, id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<QueryGet>> {
            return QueryApiFp(configuration).patchQueryIdPatch(body, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Изменить запрос по его id (полное обновление модели)
         * @summary Изменение запрос по id
         * @param {QueryCreate} body 
         * @param {string} id Id запроса
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateQueryIdPut(body: QueryCreate, id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<QueryGet>> {
            return QueryApiFp(configuration).updateQueryIdPut(body, id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * QueryApi - object-oriented interface
 * @export
 * @class QueryApi
 * @extends {BaseAPI}
 */
export class QueryApi extends BaseAPI {
    /**
     * Удалить запрос по его id
     * @summary Удаление запрос по id
     * @param {string} id Id запроса
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QueryApi
     */
    public async deleteQueryIdDelete(id: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return QueryApiFp(this.configuration).deleteQueryIdDelete(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Получить список всех запросов
     * @summary Получение всех запросов
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QueryApi
     */
    public async getAllQueryGet(limit?: number, offset?: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<Array<QueryGet>>> {
        return QueryApiFp(this.configuration).getAllQueryGet(limit, offset, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Получить запрос по его id
     * @summary Получение запрос по id
     * @param {string} id Id запроса
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QueryApi
     */
    public async getQueryIdGet(id: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<QueryGet>> {
        return QueryApiFp(this.configuration).getQueryIdGet(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Изменить запрос по его id (частичное обновление модели)
     * @summary Изменение запрос по id (только указанные поля будут изменены)
     * @param {QueryPatch} body 
     * @param {string} id Id запроса
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QueryApi
     */
    public async patchQueryIdPatch(body: QueryPatch, id: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<QueryGet>> {
        return QueryApiFp(this.configuration).patchQueryIdPatch(body, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Изменить запрос по его id (полное обновление модели)
     * @summary Изменение запрос по id
     * @param {QueryCreate} body 
     * @param {string} id Id запроса
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QueryApi
     */
    public async updateQueryIdPut(body: QueryCreate, id: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<QueryGet>> {
        return QueryApiFp(this.configuration).updateQueryIdPut(body, id, options).then((request) => request(this.axios, this.basePath));
    }
}