import { Action } from '@ngrx/store';
import { IOsInfos } from '@shared/model/os-infos.model';

// load images
export const GET_OS_INFOS = '[OS Infos] Load OS Infos';
export const GET_OS_INFOS_FAIL = '[OS Infos] Load OS Infos Fail';
export const GET_OS_INFOS_SUCCESS = '[OS Infos] Load OS Infos Success';

export class GetOSInfos implements Action {
	readonly type: string = GET_OS_INFOS;
}

export class GetOSInfosFail implements Action {
	readonly type: string = GET_OS_INFOS_FAIL;
	constructor (public payload: any) {}
}

export class GetOSInfosSuccess implements Action {
	readonly type: string = GET_OS_INFOS_SUCCESS;
	constructor (public payload: IOsInfos) {} // an array of image ids
}

// actions types
export type ImagesAction = GetOSInfos | GetOSInfosFail | GetOSInfosSuccess;
