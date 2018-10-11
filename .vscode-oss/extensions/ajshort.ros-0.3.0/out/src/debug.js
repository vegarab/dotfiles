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
const utils = require("./utils");
const path_1 = require("path");
const vscode_1 = require("vscode");
/**
 * Gets stringified settings to pass to the debug server.
 */
function getDebugSettings() {
    return __awaiter(this, void 0, void 0, function* () {
        return JSON.stringify({ env: extension.env });
    });
}
exports.getDebugSettings = getDebugSettings;
/**
 * Interacts with the user to create a `roslaunch` or `rosrun` configuration.
 */
class RosDebugConfigProvider {
    provideDebugConfigurations(folder, token) {
        return [];
    }
    resolveDebugConfiguration(folder, config, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const packages = utils.getPackages();
            const command = yield vscode_1.window.showQuickPick(["roslaunch", "rosrun"], { placeHolder: "Launch command" });
            const packageName = yield vscode_1.window.showQuickPick(packages.then(Object.keys), { placeHolder: "Package" });
            let target;
            if (packageName) {
                let basenames = (files) => files.map(file => path_1.basename(file));
                if (command === "roslaunch") {
                    const launches = utils.findPackageLaunchFiles(packageName).then(basenames);
                    target = yield vscode_1.window.showQuickPick(launches, { placeHolder: "Launch file" });
                }
                else {
                    const executables = utils.findPackageExecutables(packageName).then(basenames);
                    target = yield vscode_1.window.showQuickPick(executables, { placeHolder: "Executable" });
                }
            }
            else {
                target = yield vscode_1.window.showInputBox({ placeHolder: "Target" });
            }
            config.type = "ros";
            config.request = "launch";
            config.command = command;
            config.package = packageName;
            config.target = target;
            config.args = [];
            config.debugSettings = "${command:debugSettings}";
            return config;
        });
    }
}
exports.RosDebugConfigProvider = RosDebugConfigProvider;
//# sourceMappingURL=debug.js.map