import BaseController from "./BaseController";
import {Constants} from "com/dhrubajyoti2006/openaiassistant/utils/Constants";

/**
 * @namespace com.dhrubajyoti2006.openaiassistant.controller
 */
export default class Main extends BaseController {
	public createAssistant(): void {
		fetch(Constants.apiUrl + "/createAssistant")
			.then(response => response.text())
			.then(data => {
				console.log("Data from API:", data);
				// Process your data here
				// For example, update a model with this data
			})
			.catch(error => {
				console.error("Error fetching data:", error);
				// Handle any errors here
			});
	}
	public createThread(): void {
		fetch(Constants.apiUrl + "/createThread")
			.then(response => response.text())
			.then(data => {
				console.log("Data from API:", data);
				// Process your data here
				// For example, update a model with this data
			})
			.catch(error => {
				console.error("Error fetching data:", error);
				// Handle any errors here
			});
	}
}
