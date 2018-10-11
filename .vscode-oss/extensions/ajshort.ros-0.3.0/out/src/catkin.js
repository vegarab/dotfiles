"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const extension = require("./extension");
const cp = require("child_process");
const vscode = require("vscode");
/**
 * Interacts with the user to run a `catkin_create_pkg` command.
 */
function createPackage(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = yield vscode.window.showInputBox({
            prompt: "Package name",
            validateInput: val => val.match(/^\w+$/) ? "" : "Invalid name",
        });
        if (!name) {
            return;
        }
        const dependencies = yield vscode.window.showInputBox({
            prompt: "Dependencies",
            validateInput: val => val.match(/^\s*(\w+\s*)*$/) ? "" : "Invalid dependencies",
        });
        if (typeof dependencies === "undefined") {
            return;
        }
        const cwd = typeof uri !== "undefined" ? uri.fsPath : `${extension.baseDir}/src`;
        const opts = { cwd, env: extension.env };
        let createPkgCommand;
        if (extension.buildSystem === extension.BuildSystem.CatkinMake) {
            createPkgCommand = `catkin_create_pkg ${name} ${dependencies}`;
        }
        else if (extension.buildSystem === extension.BuildSystem.CatkinTools) {
            createPkgCommand = `catkin create pkg --catkin-deps ${dependencies} -- ${name}`;
        }
        cp.exec(createPkgCommand, opts, (err, stdout, stderr) => {
            if (!err) {
                vscode.workspace.openTextDocument(`${cwd}/${name}/package.xml`).then(vscode.window.showTextDocument);
            }
            else {
                let message = "Could not create package";
                let index = stderr.indexOf("error:");
                if (index !== -1) {
                    message += ": " + stderr.substr(index);
                }
                vscode.window.showErrorMessage(message);
            }
        });
    });
}
exports.createPackage = createPackage;
//# sourceMappingURL=catkin.js.map