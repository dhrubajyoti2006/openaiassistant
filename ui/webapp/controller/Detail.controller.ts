import BaseController from "./BaseController";
import {Route$PatternMatchedEvent} from "sap/ui/core/routing/Route";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace com.dhrubajyoti2006.openaiassistant.controller
 */
export default class Detail extends BaseController {


	public onInit(): void {
		this.getRouter().getRoute("detail")
			.attachPatternMatched((evt: Route$PatternMatchedEvent) => this._onRouteMatched(evt), this);

		this.setModel(new JSONModel({
			"mainModel": [],
		}), "mainModel");
	}

	public _onRouteMatched(oEvent: Route$PatternMatchedEvent) {
		const oArguments = oEvent.getParameter("arguments");
		const assistant_id = oArguments["assistant_id"];

		console.log(assistant_id);
	}
}
