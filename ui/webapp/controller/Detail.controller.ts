import BaseController from "./BaseController";
import {Route$PatternMatchedEvent} from "sap/ui/core/routing/Route";
import JSONModel from "sap/ui/model/json/JSONModel";
import Popover from "sap/m/Popover";
import Fragment from "sap/ui/core/Fragment";
import Input from "sap/m/Input";
import {Button$PressEvent} from "sap/m/Button";
import {Constants} from "com/dhrubajyoti2006/openaiassistant/utils/Constants";

interface OpenAIToolCall {
	id: string,
	type: string,
	function: {
		name: string,
		arguments: string
	}
}

/**
 * @namespace com.dhrubajyoti2006.openaiassistant.controller
 */
export default class Detail extends BaseController {

	assistant_id: string;
	assistant: Object;
	run_id: string;
	_oPopover: Popover;
	currentRunStatus: string;

	public onInit(): void {
		this.getRouter().getRoute("detail")
			.attachPatternMatched((evt: Route$PatternMatchedEvent) => this._onRouteMatched(evt), this);

		this.setModel(new JSONModel({
			"mainModel": [],
		}), "mainModel");
	}

	private getMainModel() {
		return this.getModel("mainModel") as JSONModel;
	}

	private setThreadId(thread_id: string) {
		(this.getModel("mainModel") as JSONModel).setProperty("/thread_id", thread_id);
	}

	private getThreadId(): string {
		return (this.getModel("mainModel") as JSONModel).getProperty("/thread_id");
	}

	public _onRouteMatched(oEvent: Route$PatternMatchedEvent) {
		const oArguments = oEvent.getParameter("arguments");
		this.assistant_id = oArguments["assistant_id"];

		// ToDo: This will later be implemented with promise.all()
		this.getAssistant(this.assistant_id);
		this.fileList();
	}

	private updateFileListForAssistant() {
		if (this.assistant && this.assistant.file_ids && this.assistant.file_ids.length
			&& (this.getModel("mainModel") as JSONModel).getProperty("/allFilesList")
			&& (this.getModel("mainModel") as JSONModel).getProperty("/allFilesList").length) {
			const allFiles = (this.getModel("mainModel") as JSONModel).getProperty("/allFilesList");
			let files = allFiles.filter((item) => {
				return this.assistant.file_ids.includes(item.id);
			});
			(this.getModel("mainModel") as JSONModel).setProperty("/files", files);
		}
	}

	public getAssistant(assistant_id: string): void {
		fetch(`${Constants.apiUrl}/getAssistant/${assistant_id}`)
			.then(response => response.text())
			.then(data => {
				this.assistant = JSON.parse(data);
				this.updateFileListForAssistant()
			})
			.catch(error => {
				console.error("Error fetching data:", error);
				// Handle any errors here
			});
	}

	public onPressAddButton() {
		fetch(Constants.apiUrl + "/createThread")
			.then(response => response.text())
			.then(data => {
				this.setThreadId(JSON.parse(data).id);
			})
			.catch(error => {
				console.error("Error fetching data:", error);
				// Handle any errors here
			});
	}

	public onPressFiles(oEvent: Button$PressEvent) {
		var oView = this.getView();

		if (!this._oPopover) {
			const oFragmentController = {
				onCloseDialog: () => {
					this._oPopover.close();
				}
			}
			Fragment.load({
				id: oView.getId(),
				name: "com.dhrubajyoti2006.openaiassistant.view.fragments.FilesPopover",
				controller: oFragmentController
			}).then((oPopover: Popover) => {
				this._oPopover = oPopover;
				oView.addDependent(this._oPopover);
				this._oPopover.openBy(oEvent.getSource());
			});
		} else {
			this._oPopover.openBy(oEvent.getSource());
		}
	}

	public deleteThread(thread_id: string): void {
		fetch(`${Constants.apiUrl}/deleteAssistant/${thread_id}`, {
			method: "DELETE"
		})
			.then(response => response.text())
			.then(data => {
				this.setThreadId(undefined);
			})
			.catch(error => {
				console.error("Error deleting data:", error);
				// Handle any errors here
			});
	}

	private onPressSend() {
		const content = (this.getView().byId("idMessage") as Input).getValue();
		const thread_id = (this.getModel("mainModel") as JSONModel).getProperty("/thread_id");

		fetch(Constants.apiUrl + "/createMessage", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({thread_id: thread_id, content: content})
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json(); // Assuming the response is JSON
			})
			.then(data => {
				console.log("Message created successfully", data);
				(this.getView().byId("idMessage") as Input).setValue("");
				this.createRun(this.assistant_id, thread_id);
			})
			.catch(error => {
				console.error("Error creating message:", error);
			});
	}

	public createRun(assistant_id: string, thread_id: string): void {
		fetch(Constants.apiUrl + "/createRun", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({assistant_id: assistant_id, thread_id: thread_id})
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json(); // Assuming the response is JSON
			})
			.then(data => {
				this.run_id = data.id;
				this.currentRunStatus = "started";
				// this.startRunCheck();
				console.log("Message created successfully", data);
				// Handle success, maybe update UI or clear form
			})
			.catch(error => {
				console.error("Error creating message:", error);
				// Handle any errors here, maybe show user feedback
			});
	}

	private onPressRefreshButton() {
		this.retrieveRun(this.getThreadId(), this.run_id);
	}

	private getWeather(location: string, unit: string) {
		return `This is the Temperature of ${location}: 25 degree ${unit}`
	}

	public handleFunctionToolCall(id: string, functionName: string, functionArguments: string) {
		const parsedArguments = JSON.parse(functionArguments);
		let returnValue = "";

		if (functionName == "get_weather") {
			returnValue = this.getWeather(parsedArguments.location, parsedArguments.unit);
		} else {
			returnValue = "Unable to find the functional name";
		}

		return {
			tool_call_id: id,
			output: returnValue
		}
	}

	public handleToolCalls(tool_calls: Array<OpenAIToolCall>) {
		let toolOutputs: Array<string> = [];
		for (let i = 0; i < tool_calls.length; i++) {
			const tool_call = tool_calls[i];
			if (tool_call.type == "function") {
				const functionResponse = this.handleFunctionToolCall(tool_call.id, tool_call.function.name, tool_call.function.arguments);

				toolOutputs.push(functionResponse);
			}
		}

		return toolOutputs;
	}

	public submitToolOutput(thread_id: string, run_id: string, toolOutputs: Array<string>) {
		fetch(`${Constants.apiUrl}/submitToolOutputs/${thread_id}/${run_id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(toolOutputs)
		})
			.then(response => response.text())
			.then(data => {
				console.log(JSON.parse(data));
			})
			.catch(error => {
				console.error("Error fetching data:", error);
				// Handle any errors here
			});
	}

	public retrieveRun(thread_id: string, run_id: string) {
		fetch(`${Constants.apiUrl}/retrieveRun/${thread_id}/${run_id}`)
			.then(response => response.text())
			.then(data => {
				const response = JSON.parse(data);
				if (response?.required_action?.submit_tool_outputs?.tool_calls) {
					const tools_calls = response.required_action.submit_tool_outputs.tool_calls;

					const toolOutputs = this.handleToolCalls(tools_calls);

					this.submitToolOutput(thread_id, run_id, toolOutputs);
				}

				this.currentRunStatus = response.status;
				if (response.status === "completed") {
					this.messageList(this.getThreadId());
				}
			})
			.catch(error => {
				console.error("Error fetching data:", error);
				// Handle any errors here
			});
	}

	public messageList(thread_id: string): void {
		fetch(`${Constants.apiUrl}/messageList/${thread_id}`)
			.then(response => response.text())
			.then(data => {
				this.getMainModel().setProperty("/messages", JSON.parse(data).data.reverse());
			})
			.catch(error => {
				console.error("Error fetching data:", error);
				// Handle any errors here
			});
	}

	public fileList(): void {
		fetch(Constants.apiUrl + "/fileList")
			.then(response => response.text())
			.then(data => {
				(this.getModel("mainModel") as JSONModel).setProperty("/allFilesList", JSON.parse(data).data);
				this.updateFileListForAssistant();
			})
			.catch(error => {
				console.error("Error fetching data:", error);
				// Handle any errors here
			});
	}

	// ToDo: To have a better solution later with something like signalR or so
	private startRunCheck() {
		const intervalId = setInterval(() => {
			this.retrieveRun(this.getThreadId(), this.run_id);

			if (this.currentRunStatus === "completed") {
				clearInterval(intervalId);
			}
		}, 500); // 500 milliseconds interval
	}
}
