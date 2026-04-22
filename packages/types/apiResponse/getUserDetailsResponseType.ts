import { basicResponseType } from "./basicResponseType.js";
export interface getUserDetailsResponseType extends basicResponseType{
	id: string,
	name: string,
	email: string,
}