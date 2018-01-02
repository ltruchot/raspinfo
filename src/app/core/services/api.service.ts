// ng dependencies
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';

// npm dependencies
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map } from 'rxjs/operators';

// custom env
import { environment } from '@env/environment';

@Injectable()
export class ApiService {
	constructor (private http: Http) { }

	getBasicOptions (auth?: boolean, search?: any): RequestOptions {
		// console.log('api.service::getBasicOptions', auth, search);
		const headers = new Headers({});
		headers.append('Content-Type', 'application/json');
		if (auth) { this.addAuth(headers); }
		const options = new RequestOptions({ headers });
		if (search) {
			options.search = this.encodeSearchParams(search);
		}
		return options;
	}

	encodeSearchParams (searchObj: any): URLSearchParams {
		// console.log('api.service::encodeSearchParams', searchObj);
		const params =  new URLSearchParams();
		for (const param in searchObj) {
			if (searchObj.hasOwnProperty(param)) {
				params.append(param, JSON.stringify(searchObj[param]));
			}
		}
		return params;
	}

	getResources (url: string, auth?: boolean, search?: any): Observable<any>  {
		// console.log('api.service::getResources', url, auth, search);
		url = environment.urlAPI + url;
		return this.http.get(url, this.getBasicOptions(auth, search))
			.pipe(map((res: any) => res.json()), catchError(this.throwReactiveError));
	}

	deleteResources (url: string, auth?: boolean): Observable<any>   {
		url = environment.urlAPI + url;
		return this.http.delete(url, this.getBasicOptions(auth))
			.pipe(map((res: any) => res.json()), catchError(this.throwReactiveError));
	}

	throwReactiveError (error: any): ErrorObservable {
		// console.error('api.service::throwReactiveError', error);
		return Observable.throw(error.json());
	}

	addAuth (headers: Headers): void {
		const token = window.localStorage.getItem('token');
		headers.append('Authorization', 'Bearer ' + token);
	}
}
