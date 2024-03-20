import BaseController from "./BaseController";
import {Route$PatternMatchedEvent} from "sap/ui/core/routing/Route";
import JSONModel from "sap/ui/model/json/JSONModel";
import {List$ItemDeleteEvent, List$SelectionChangeEvent} from "sap/ui/webc/main/List";
import {ListPanel$ItemPressEvent} from "sap/ui/vk/ListPanel";

/**
 * @namespace com.dhrubajyoti2006.openaiassistant.controller
 */
export default class Master extends BaseController {


	public onInit(): void {
		this.getRouter().getRoute("home")
			.attachPatternMatched((evt: Route$PatternMatchedEvent) => this._onRouteMatched(evt), this);

		this.setModel(new JSONModel({
			"mainModel": [],
		}), "mainModel");
	}

	public _onRouteMatched(oEvent: Route$PatternMatchedEvent) {
		// const oArguments = <RoutingParams>oEvent.getParameter("arguments"),
		// 	iPackageId = oArguments["packageId"];
		this.assistantsList();
	}

	public onPressAddButton() {
		fetch("http://localhost:3000/createAssistant")
			.then(response => response.text())
			.then(data => {
				this.assistantsList();
			})
			.catch(error => {
				console.error("Error fetching data:", error);
				// Handle any errors here
			});
	}

	public assistantsList(): void {
		fetch("http://localhost:3000/assistantsList")
			.then(response => response.text())
			.then(data => {
				(this.getModel("mainModel") as JSONModel).setProperty("/assistantsList", JSON.parse(data).data);
			})
			.catch(error => {
				console.error("Error fetching data:", error);
				// Handle any errors here
			});
	}

	public onDetailPress() {
		console.log("onDetailPress");
	}

	public deleteAssistant(assistant_id: string): void {
		fetch(`http://localhost:3000/deleteAssistant/${assistant_id}`, {
			method: 'DELETE'
		})
			.then(response => response.text())
			.then(data => {
				this.assistantsList();
			})
			.catch(error => {
				console.error("Error fetching data:", error);
				// Handle any errors here
			});
	}

	public onDelete(oEvent: List$ItemDeleteEvent) {
		const id = oEvent.getParameter("listItem").getBindingContext("mainModel").getObject().id;
		this.deleteAssistant(id);
	}

	public onItemPress(oEvent: ListPanel$ItemPressEvent) {
		this.getRouter().navTo("detail", {
			"assistant_id": oEvent.getParameter("listItem").getBindingContext("mainModel").getObject().id
		}, true);
	}
}
