import { PatrollersApi, PatrollersPostRequest } from 'patroller-api-client'

export interface ApiInterface {
    createPatroller(request: PatrollersPostRequest): any;
}

export default class Api implements ApiInterface {
    patrollersApi: PatrollersApi
    
    constructor(props: object) {
        this.patrollersApi = new PatrollersApi({
            basePath: 'http://localhost:5000',
        });
    }

    createPatroller(request: PatrollersPostRequest): any {
        return async (dispatch: any) => {
            try {
                const { data } = await this.patrollersApi.createPatroller(
                    request,
                )
                dispatch({
                    type: 'PATROLLER_ACTION',
                    id: 'patroller_id',
                    value: data.patrollerId,
                });
                return;
            } catch (error) {
                console.log('error', error)
            }
        }
    }
}
