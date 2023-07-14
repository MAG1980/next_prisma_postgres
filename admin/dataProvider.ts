import {DataProvider, fetchUtils} from "react-admin";
import {stringify} from "query-string";


const apiUrl = process.env.NEXT_PUBLIC_APP_URL + "/api"

const httpClient = fetchUtils.fetchJson;

export const dataProvider: DataProvider = {
    getList: (resource, params) => {
        const {page, perPage} = params.pagination;

        // const { field, order } = params.sort;
        const query = {
            // sort: JSON.stringify([field, order]),
            // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            // filter: JSON.stringify(params.filter),
            ...params
        };

        //Из параметров запроса React-Admin формируем URL-адрес нашего API с необходимыми query-параметрами
        //Функция stringify из полученного объекта формирует строку query-параметров вида: page=2&perPage=10
        const url = `${apiUrl}/${resource}?${stringify({page: page, perPage: perPage})}`;

        const response = httpClient(url).then(({headers, json}) => {
            return {
                data: json.data,
                // total: parseInt(headers.get('content-range').split('/').pop(), 10),
                total: parseInt((headers.get('content-range') || "0").split('/').pop() || 0, 10),
            }
        });
        return response
    },

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({id: params.ids}),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({json}) => ({data: json.data}));
    },


    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        console.log(url)
        return httpClient(url).then(({json}) => ({
                data: json.data,
            })
        )
    },

    /*    getManyReference: (resource, params) => {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify({
                    ...params.filter,
                    [params.target]: params.id,
                }),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;

            return httpClient(url).then(({ headers, json }) => ({
                data: json,
                total: parseInt((headers.get('content-range') || "0").split('/').pop() || 0, 10),
            }));
        },*/

        update: (resource, params) => {
            console.log(params)
            return httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            }).then(({json}) => ({data: json.data}))
        },

    /*    updateMany: (resource, params) => {
            const query = {
                filter: JSON.stringify({ id: params.ids}),
            };
            return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({ data: json }));
        },*/

    create: (resource, params) => {
        console.log(params)
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({json}) => ({
            data: {...params.data, id: json.id},
        }))
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({json}) => ({data: json.data})),

    deleteMany: (resource, params) => {
        const idsString = params.ids.join(',')
        const url = `${apiUrl}/${resource}/${idsString}`

        return httpClient(url, {
            method: 'DELETE',
        }).then(({json}) => {
            return ({data: json.data})
        });
    }
};