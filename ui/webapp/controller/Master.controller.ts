import BaseController from "./BaseController";
import {Route$PatternMatchedEvent} from "sap/ui/core/routing/Route";
import JSONModel from "sap/ui/model/json/JSONModel";
import {List$ItemDeleteEvent} from "sap/ui/webc/main/List";
import {ListPanel$ItemPressEvent} from "sap/ui/vk/ListPanel";
import Dialog from "sap/ui/webc/main/Dialog";
import Fragment from "sap/ui/core/Fragment";
import {StandardListItem$DetailClickEvent} from "sap/ui/webc/main/StandardListItem";
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace com.dhrubajyoti2006.openaiassistant.controller
 */
export default class Master extends BaseController {

	public onInit(): void {
		this.getRouter().getRoute("home")
			.attachPatternMatched((evt: Route$PatternMatchedEvent) => this._onRouteMatched(evt), this);
		this.getRouter().getRoute("detail")
			.attachPatternMatched((evt: Route$PatternMatchedEvent) => this._onDetailRouteMatched(evt), this);

		this.setModel(new JSONModel({
			"mainModel": [],
		}), "mainModel");
	}

	private getMainModel() {
		return this.getModel("mainModel") as JSONModel;
	}

	private openCreateAssistantDialog() {
		const oView = this.getView();

		// Load the dialog fragment asynchronously
		if (!this.byId("createAssistantDialog")) {
			Fragment.load({
				id: oView.getId(),
				name: "com.dhrubajyoti2006.openaiassistant.view.fragments.CreateAssistantDialog",
				controller: this
			}).then((oDialog) => {
				// Connect dialog to the root view of this component (models, lifecycle)
				oView.addDependent(oDialog as Dialog);
				(oDialog as Dialog).open();
			});
		} else {
			this.byId("createAssistantDialog").open();
		}
	}

	public _onRouteMatched(oEvent: Route$PatternMatchedEvent) {
		// const oArguments = <RoutingParams>oEvent.getParameter("arguments"),
		// 	iPackageId = oArguments["packageId"];
		this.assistantsList();
	}

	public _onDetailRouteMatched(oEvent: Route$PatternMatchedEvent) {
		// const oArguments = <RoutingParams>oEvent.getParameter("arguments"),
		// 	iPackageId = oArguments["packageId"];
		this.assistantsList();
	}

	public onPressAddButton() {
		this.getMainModel().setProperty("/assistant", {
			name: "",
			instructions: "",
			code_interpreter: false,
			retrieval: true
		});
		this.openCreateAssistantDialog();
		return;
	}

	private onSubmitAssistantUpdate() {
		fetch('http://localhost:3000/createAssistant', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.getMainModel().getProperty("/assistant"))
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Assuming the response is JSON
			})
			.then(data => {
				(this.byId("createAssistantDialog") as Dialog).close();
				this.assistantsList();
				// Handle success, maybe update UI or clear form
			})
			.catch(error => {
				console.error("Error creating message:", error);
				// Handle any errors here, maybe show user feedback
			});
	}

	private onDialogCancel() {
		(this.byId("createAssistantDialog") as Dialog).close();
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

	public onDetailPress(oEvent: StandardListItem$DetailClickEvent) {
		const selectedAssistant = oEvent.getSource().getBindingContext("mainModel").getObject();

		this.getMainModel().setProperty("/assistant", {
			id: selectedAssistant.id ?? "",
			name: selectedAssistant.name,
			instructions: selectedAssistant.instructions,
			code_interpreter: selectedAssistant.tools.some(item => item.type === "code_interpreter"),
			retrieval: selectedAssistant.tools.some(item => item.type === "retrieval")
		});
		this.openCreateAssistantDialog();
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
				console.error("Error deleting data:", error);
				// Handle any errors here
			});
	}

	public onDelete(oEvent: List$ItemDeleteEvent): void {
		const id = oEvent.getParameter("listItem").getBindingContext("mainModel").getObject().id;
		MessageBox.confirm("Are you sure you want to delete?", {
			title: "Confirm Deletion",
			onClose: (oAction) => {
				if (oAction === MessageBox.Action.OK) {
					// Perform the deletion logic here
					this.deleteAssistant(id);
					// For example, call a function to handle the actual deletion
				} else {
					console.log("Item deletion cancelled");
				}
			}
		});
	}

	public onItemPress(oEvent: ListPanel$ItemPressEvent) {
		this.getRouter().navTo("detail", {
			"assistant_id": oEvent.getParameter("listItem").getBindingContext("mainModel").getObject().id
		}, true);
	}
}
