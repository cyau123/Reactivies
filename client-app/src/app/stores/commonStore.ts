import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    // get the token with the key 'jwt'
    token: string | null | undefined = localStorage.getItem('jwt');
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.token, // data function, when this.token is changed, effect function will be triggered
            token => { // effect function
                if (token) {
                    localStorage.setItem('jwt', token)
                } else {
                    // logout and remove token from storage
                    localStorage.removeItem('jwt')
                }
            }
        )
    }

    setServerError(error: ServerError) {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}