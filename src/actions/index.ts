import {
    PatrollersApi,
    PatrollersPostRequest,
    AuthenticationPostRequest,
    AuthenticationApi,
    SchedulePostRequest
} from 'patroller-api-client'

import { Routes } from '../reducers/views'

export interface ApiInterface {
    createPatroller(request: PatrollersPostRequest): any
    getPatrollers(): any
    login(request: AuthenticationPostRequest): any
}

export class Api implements ApiInterface {
    patrollersApi: PatrollersApi
    authApi: AuthenticationApi

    constructor(props: object) {
        this.patrollersApi = new PatrollersApi({
            basePath: 'http://127.0.0.1:5000',
        })

        this.authApi = new AuthenticationApi({
            basePath: 'http://127.0.0.1:5000',
        })
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
                    value: data.id,
                })
                return
            } catch (error) {
                console.log('error', error)
            }
        }
    }

    getPatrollers(): any {
        return async (dispatch: any) => {
            try {
                const { data } = await this.patrollersApi.getPatrollers()
                dispatch({
                    type: 'INIT_PATROLLERS',
                    value: data,
                })
                return
            } catch (error) {
                console.log('error', error)
            }
        }
    }

    getPatroller(sp_number: number): any {
        return async (dispatch: any, getState: any) => {
            const {
                authentication: { access_token },
            } = getState()

            const { data } = await this.patrollersApi.getPatroller(sp_number)

            dispatch({
                type: 'PATROLLER_ACTION',
                id: 'details',
                value: data,
            })
        }
    }

    login(request: AuthenticationPostRequest): any {
        return async (dispatch: any) => {
            try {
                const result: any = await this.authApi.createAuthToken(request)
                const token = result.data.access_token
                dispatch({
                    type: 'AUTH_ACTION',
                    id: 'access_token',
                    value: token,
                })

                dispatch(this.getPatroller((request as any).sp_number))
                dispatch({
                    type: 'AUTH_ACTION',
                    id: 'authenticated',
                    value: true,
                })
                dispatch({
                    type: 'VIEW_ACTION',
                    id: 'activeRoute',
                    value: Routes.Patroller,
                })
                return
            } catch (error) {
                console.log('login::error', error)
            }
        }
    }

    logout(): any {
        return (dispatch: any) => {
            try {
                dispatch({
                    type: 'AUTH_ACTION',
                    id: 'access_token',
                    value: '',
                })
                dispatch({
                    type: 'AUTH_ACTION',
                    id: 'authenticated',
                    value: false,
                })
                dispatch({
                    type: 'VIEW_ACTION',
                    id: 'activeRoute',
                    value: Routes.Logout,
                })
                return
            } catch (error) {
                console.log('logout::error', error)
            }
        }
    }

    schedulePatrol(request: any): any {
        return async (dispatch: any) => {
            const { sp_number } = request;
            const endDate = new Date();
            endDate.setDate(request.startDate.getDate() + (request.overnight == true ? 1 : 0));
            const { data } = await this.patrollersApi.postPatrollerSchedule(sp_number, {
                startDate: request.startDate,
                endDate,
                attendee: request.attendee,
                spNumber: request.sp_number,
                location: request.location,
                day: request.day,
                overnight: request.overnight,
            } as any);
        }
    }

    getPatrollerSchedule(sp_number: number): any {
        return async (dispatch: any) => {
            const { data } = await this.patrollersApi.getPatrollerSchedule(sp_number);

            console.log('data', data);

        }
    }

}

const ApiInstance = new Api({})

export default ApiInstance
