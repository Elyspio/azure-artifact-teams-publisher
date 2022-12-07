//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.17.0.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from "axios";
import axios, { AxiosError } from "axios";

export class ArtifactClient {
	protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
	private instance: AxiosInstance;
	private baseUrl: string;

	constructor(baseUrl?: string, instance?: AxiosInstance) {
		this.instance = instance ? instance : axios.create();

		this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://localhost:4000";
	}

	getFeeds(organisation: string, cancelToken?: CancelToken | undefined): Promise<AzureFeed[]> {
		let url_ = this.baseUrl + "/api/artifacts/{organisation}/feeds";
		if (organisation === undefined || organisation === null) throw new Error("The parameter 'organisation' must be defined.");
		url_ = url_.replace("{organisation}", encodeURIComponent("" + organisation));
		url_ = url_.replace(/[?&]$/, "");

		let options_: AxiosRequestConfig = {
			method: "GET",
			url: url_,
			headers: {
				Accept: "application/json",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processGetFeeds(_response);
			});
	}

	searchArtifact(organisation: string, feed: string, query: string, cancelToken?: CancelToken | undefined): Promise<ArtifactInfo[]> {
		let url_ = this.baseUrl + "/api/artifacts/{organisation}/feeds/{feed}?";
		if (organisation === undefined || organisation === null) throw new Error("The parameter 'organisation' must be defined.");
		url_ = url_.replace("{organisation}", encodeURIComponent("" + organisation));
		if (feed === undefined || feed === null) throw new Error("The parameter 'feed' must be defined.");
		url_ = url_.replace("{feed}", encodeURIComponent("" + feed));
		if (query === undefined || query === null) throw new Error("The parameter 'query' must be defined and cannot be null.");
		else url_ += "query=" + encodeURIComponent("" + query) + "&";
		url_ = url_.replace(/[?&]$/, "");

		let options_: AxiosRequestConfig = {
			method: "GET",
			url: url_,
			headers: {
				Accept: "application/json",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processSearchArtifact(_response);
			});
	}

	getAllArtifact(organisation: string, cancelToken?: CancelToken | undefined): Promise<ArtifactBase[]> {
		let url_ = this.baseUrl + "/api/artifacts/{organisation}/managed";
		if (organisation === undefined || organisation === null) throw new Error("The parameter 'organisation' must be defined.");
		url_ = url_.replace("{organisation}", encodeURIComponent("" + organisation));
		url_ = url_.replace(/[?&]$/, "");

		let options_: AxiosRequestConfig = {
			method: "GET",
			url: url_,
			headers: {
				Accept: "application/json",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processGetAllArtifact(_response);
			});
	}

	getAllArtifactWithNewVersion(organisation: string, cancelToken?: CancelToken | undefined): Promise<{ [key: string]: string }> {
		let url_ = this.baseUrl + "/api/artifacts/{organisation}/managed/new";
		if (organisation === undefined || organisation === null) throw new Error("The parameter 'organisation' must be defined.");
		url_ = url_.replace("{organisation}", encodeURIComponent("" + organisation));
		url_ = url_.replace(/[?&]$/, "");

		let options_: AxiosRequestConfig = {
			method: "GET",
			url: url_,
			headers: {
				Accept: "application/json",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processGetAllArtifactWithNewVersion(_response);
			});
	}

	addArtifact(organisation: string, feed: string, request: AddArtifactRequest, cancelToken?: CancelToken | undefined): Promise<Artifact> {
		let url_ = this.baseUrl + "/api/artifacts/{organisation}/feeds/{feed}/managed";
		if (organisation === undefined || organisation === null) throw new Error("The parameter 'organisation' must be defined.");
		url_ = url_.replace("{organisation}", encodeURIComponent("" + organisation));
		if (feed === undefined || feed === null) throw new Error("The parameter 'feed' must be defined.");
		url_ = url_.replace("{feed}", encodeURIComponent("" + feed));
		url_ = url_.replace(/[?&]$/, "");

		const content_ = JSON.stringify(request);

		let options_: AxiosRequestConfig = {
			data: content_,
			method: "POST",
			url: url_,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processAddArtifact(_response);
			});
	}

	deleteArtifact(organisation: string, id: string, cancelToken?: CancelToken | undefined): Promise<void> {
		let url_ = this.baseUrl + "/managed/{id}?";
		if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		if (organisation === undefined || organisation === null) throw new Error("The parameter 'organisation' must be defined and cannot be null.");
		else url_ += "organisation=" + encodeURIComponent("" + organisation) + "&";
		url_ = url_.replace(/[?&]$/, "");

		let options_: AxiosRequestConfig = {
			method: "DELETE",
			url: url_,
			headers: {},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processDeleteArtifact(_response);
			});
	}

	protected processGetFeeds(response: AxiosResponse): Promise<AzureFeed[]> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200) {
			const _responseText = response.data;
			let result200: any = null;
			let resultData200 = _responseText;
			result200 = JSON.parse(resultData200);
			return Promise.resolve<AzureFeed[]>(result200);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<AzureFeed[]>(null as any);
	}

	protected processSearchArtifact(response: AxiosResponse): Promise<ArtifactInfo[]> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200) {
			const _responseText = response.data;
			let result200: any = null;
			let resultData200 = _responseText;
			result200 = JSON.parse(resultData200);
			return Promise.resolve<ArtifactInfo[]>(result200);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<ArtifactInfo[]>(null as any);
	}

	protected processGetAllArtifact(response: AxiosResponse): Promise<ArtifactBase[]> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200) {
			const _responseText = response.data;
			let result200: any = null;
			let resultData200 = _responseText;
			result200 = JSON.parse(resultData200);
			return Promise.resolve<ArtifactBase[]>(result200);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<ArtifactBase[]>(null as any);
	}

	protected processGetAllArtifactWithNewVersion(response: AxiosResponse): Promise<{ [key: string]: string }> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200) {
			const _responseText = response.data;
			let result200: any = null;
			let resultData200 = _responseText;
			result200 = JSON.parse(resultData200);
			return Promise.resolve<{ [key: string]: string }>(result200);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<{ [key: string]: string }>(null as any);
	}

	protected processAddArtifact(response: AxiosResponse): Promise<Artifact> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 201) {
			const _responseText = response.data;
			let result201: any = null;
			let resultData201 = _responseText;
			result201 = JSON.parse(resultData201);
			return Promise.resolve<Artifact>(result201);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<Artifact>(null as any);
	}

	protected processDeleteArtifact(response: AxiosResponse): Promise<void> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 204) {
			const _responseText = response.data;
			return Promise.resolve<void>(null as any);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<void>(null as any);
	}
}

export class ProjectClient {
	protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
	private instance: AxiosInstance;
	private baseUrl: string;

	constructor(baseUrl?: string, instance?: AxiosInstance) {

		this.instance = instance ? instance : axios.create();

		this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://localhost:4000";

	}

	getAllProjects(organisation: string, cancelToken?: CancelToken | undefined): Promise<Project[]> {
		let url_ = this.baseUrl + "/api/projects/{organisation}";
		if (organisation === undefined || organisation === null)
			throw new Error("The parameter 'organisation' must be defined.");
		url_ = url_.replace("{organisation}", encodeURIComponent("" + organisation));
		url_ = url_.replace(/[?&]$/, "");

		let options_: AxiosRequestConfig = {
			method: "GET",
			url: url_,
			headers: {
				"Accept": "application/json",
			},
			cancelToken,
		};

		return this.instance.request(options_).catch((_error: any) => {
			if (isAxiosError(_error) && _error.response) {
				return _error.response;
			} else {
				throw _error;
			}
		}).then((_response: AxiosResponse) => {
			return this.processGetAllProjects(_response);
		});
	}

	refreshAll(organisation: string, cancelToken?: CancelToken | undefined): Promise<void> {
		let url_ = this.baseUrl + "/api/projects/{organisation}";
		if (organisation === undefined || organisation === null)
			throw new Error("The parameter 'organisation' must be defined.");
		url_ = url_.replace("{organisation}", encodeURIComponent("" + organisation));
		url_ = url_.replace(/[?&]$/, "");

		let options_: AxiosRequestConfig = {
			method: "PATCH",
			url: url_,
			headers: {},
			cancelToken,
		};

		return this.instance.request(options_).catch((_error: any) => {
			if (isAxiosError(_error) && _error.response) {
				return _error.response;
			} else {
				throw _error;
			}
		}).then((_response: AxiosResponse) => {
			return this.processRefreshAll(_response);
		});
	}

	updateRepositoryMaintainers(organisation: string, repositoryId: string, maintainers: UserData[], cancelToken?: CancelToken | undefined): Promise<void> {
		let url_ = this.baseUrl + "/api/projects/{organisation}/repositories/{repositoryId}";
		if (organisation === undefined || organisation === null)
			throw new Error("The parameter 'organisation' must be defined.");
		url_ = url_.replace("{organisation}", encodeURIComponent("" + organisation));
		if (repositoryId === undefined || repositoryId === null)
			throw new Error("The parameter 'repositoryId' must be defined.");
		url_ = url_.replace("{repositoryId}", encodeURIComponent("" + repositoryId));
		url_ = url_.replace(/[?&]$/, "");

		const content_ = JSON.stringify(maintainers);

		let options_: AxiosRequestConfig = {
			data: content_,
			method: "PUT",
			url: url_,
			headers: {
				"Content-Type": "application/json",
			},
			cancelToken,
		};

		return this.instance.request(options_).catch((_error: any) => {
			if (isAxiosError(_error) && _error.response) {
				return _error.response;
			} else {
				throw _error;
			}
		}).then((_response: AxiosResponse) => {
			return this.processUpdateRepositoryMaintainers(_response);
		});
	}

	protected processGetAllProjects(response: AxiosResponse): Promise<Project[]> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200) {
			const _responseText = response.data;
			let result200: any = null;
			let resultData200 = _responseText;
			result200 = JSON.parse(resultData200);
			return Promise.resolve<Project[]>(result200);

		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<Project[]>(null as any);
	}

	protected processRefreshAll(response: AxiosResponse): Promise<void> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 204) {
			const _responseText = response.data;
			return Promise.resolve<void>(null as any);

		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<void>(null as any);
	}

	protected processUpdateRepositoryMaintainers(response: AxiosResponse): Promise<void> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 204) {
			const _responseText = response.data;
			return Promise.resolve<void>(null as any);

		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<void>(null as any);
	}
}

export class TokenClient {
	protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
	private instance: AxiosInstance;
	private baseUrl: string;

	constructor(baseUrl?: string, instance?: AxiosInstance) {

		this.instance = instance ? instance : axios.create();

		this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://localhost:4000";

	}

	getToken(organisation: string, cancelToken?: CancelToken | undefined): Promise<Token> {
		let url_ = this.baseUrl + "/api/token/{organisation}";
		if (organisation === undefined || organisation === null)
			throw new Error("The parameter 'organisation' must be defined.");
		url_ = url_.replace("{organisation}", encodeURIComponent("" + organisation));
		url_ = url_.replace(/[?&]$/, "");

		let options_: AxiosRequestConfig = {
			method: "GET",
			url: url_,
			headers: {
				"Accept": "application/json",
			},
			cancelToken,
		};

		return this.instance.request(options_).catch((_error: any) => {
			if (isAxiosError(_error) && _error.response) {
				return _error.response;
			} else {
				throw _error;
			}
		}).then((_response: AxiosResponse) => {
			return this.processGetToken(_response);
		});
	}

	setToken(organisation: string, request: SetTokenRequest, cancelToken?: CancelToken | undefined): Promise<void> {
		let url_ = this.baseUrl + "/api/token/{organisation}";
		if (organisation === undefined || organisation === null)
			throw new Error("The parameter 'organisation' must be defined.");
		url_ = url_.replace("{organisation}", encodeURIComponent("" + organisation));
		url_ = url_.replace(/[?&]$/, "");

		const content_ = JSON.stringify(request);

		let options_: AxiosRequestConfig = {
			data: content_,
			method: "POST",
			url: url_,
			headers: {
				"Content-Type": "application/json",
			},
			cancelToken,
		};

		return this.instance.request(options_).catch((_error: any) => {
			if (isAxiosError(_error) && _error.response) {
				return _error.response;
			} else {
				throw _error;
			}
		}).then((_response: AxiosResponse) => {
			return this.processSetToken(_response);
		});
	}

	protected processGetToken(response: AxiosResponse): Promise<Token> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 204) {
			const _responseText = response.data;
			return throwException("A server side error occurred.", status, _responseText, _headers);

		} else if (status === 200) {
			const _responseText = response.data;
			let result200: any = null;
			let resultData200 = _responseText;
			result200 = JSON.parse(resultData200);
			return Promise.resolve<Token>(result200);

		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<Token>(null as any);
	}

	protected processSetToken(response: AxiosResponse): Promise<void> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 204) {
			const _responseText = response.data;
			return Promise.resolve<void>(null as any);

		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<void>(null as any);
	}
}

export class UserClient {
	protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
	private instance: AxiosInstance;
	private baseUrl: string;

	constructor(baseUrl?: string, instance?: AxiosInstance) {

		this.instance = instance ? instance : axios.create();

		this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://localhost:4000";

	}

	search(organisation: string, nameOrEmail: string, cancelToken?: CancelToken | undefined): Promise<UserData[]> {
		let url_ = this.baseUrl + "/api/users/{organisation}?";
		if (organisation === undefined || organisation === null)
			throw new Error("The parameter 'organisation' must be defined.");
		url_ = url_.replace("{organisation}", encodeURIComponent("" + organisation));
		if (nameOrEmail === undefined || nameOrEmail === null)
			throw new Error("The parameter 'nameOrEmail' must be defined and cannot be null.");
		else
			url_ += "nameOrEmail=" + encodeURIComponent("" + nameOrEmail) + "&";
		url_ = url_.replace(/[?&]$/, "");

		let options_: AxiosRequestConfig = {
			method: "GET",
			url: url_,
			headers: {
				"Accept": "application/json",
			},
			cancelToken,
		};

		return this.instance.request(options_).catch((_error: any) => {
			if (isAxiosError(_error) && _error.response) {
				return _error.response;
			} else {
				throw _error;
			}
		}).then((_response: AxiosResponse) => {
			return this.processSearch(_response);
		});
	}

	protected processSearch(response: AxiosResponse): Promise<UserData[]> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200) {
			const _responseText = response.data;
			let result200: any = null;
			let resultData200 = _responseText;
			result200 = JSON.parse(resultData200);
			return Promise.resolve<UserData[]>(result200);

		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<UserData[]>(null as any);
	}
}

export interface AzureFeed {
	id: string;
	name: string;
}

export interface ArtifactInfo {
	name: string;
	feed: string;
	organisation: string;
}

export interface ArtifactBase extends ArtifactInfo {
	latestVersion?: string;
}

export interface Artifact extends ArtifactBase {
	id?: string;
}

export interface AddArtifactRequest {
	artifact?: string | undefined;
	version?: string | undefined;
}

export interface Project {
	organisation: string;
	idAzure: string;
	name: string;
	repositories: Repository[];
}

export interface Repository {
	id: string;
	name: string;
	maintainers: UserData[];
}

export interface UserData {
	mail: string;
	id: string;
	name: string;
}

export interface TokenBase {
	pat: string;
	expiration: TokenExpiration;
	organisation: string;
}

export interface Token extends TokenBase {
	id?: string;
	expireAt?: string;
}

export enum TokenExpiration {
	Day30 = "Day30",
	Day60 = "Day60",
	Day90 = "Day90",
	Year = "Year",
}

export interface SetTokenRequest {
	pat?: string | undefined;
	expiration: TokenExpiration;
}

export class ApiException extends Error {
	override message: string;
	status: number;
	response: string;
	headers: { [key: string]: any; };
	result: any;
	protected isApiException = true;

	constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
		super();

		this.message = message;
		this.status = status;
		this.response = response;
		this.headers = headers;
		this.result = result;
	}

	static isApiException(obj: any): obj is ApiException {
		return obj.isApiException === true;
	}
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
	if (result !== null && result !== undefined)
		throw result;
	else
		throw new ApiException(message, status, response, headers, null);
}

function isAxiosError(obj: any | undefined): obj is AxiosError {
	return obj && obj.isAxiosError === true;
}