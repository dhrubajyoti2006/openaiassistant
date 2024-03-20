import BaseController from "./BaseController";

/**
 * @namespace com.dhrubajyoti2006.openaiassistant.controller
 */
export default class Main extends BaseController {
	public createAssistant(): void {
		fetch("http://localhost:3000/createAssistant")
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
		fetch("http://localhost:3000/createThread")
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
