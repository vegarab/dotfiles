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
const build = require("./build");
const catkin = require("./catkin");
const catkin_task_provider_1 = require("./catkin-task-provider");
const constants = require("./constants");
const cpp_formatter_1 = require("./cpp-formatter");
const debug = require("./debug");
const master = require("./master");
const pfs = require("./promise-fs");
const utils = require("./utils");
const path_1 = require("path");
const vscode = require("vscode");
let context;
var BuildSystem;
(function (BuildSystem) {
    BuildSystem[BuildSystem["None"] = 0] = "None";
    BuildSystem[BuildSystem["CatkinMake"] = 1] = "CatkinMake";
    BuildSystem[BuildSystem["CatkinTools"] = 2] = "CatkinTools";
})(BuildSystem = exports.BuildSystem || (exports.BuildSystem = {}));
;
let onEnvChanged = new vscode.EventEmitter();
/**
 * Triggered when the env is soured.
 */
exports.onDidChangeEnv = onEnvChanged.event;
/**
 * Subscriptions to dispose when the environment is changed.
 */
let subscriptions = [];
function activate(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        // Activate if we're in a catkin workspace.
        context = ctx;
        yield determineBuildSystem(vscode.workspace.rootPath);
        if (exports.buildSystem == BuildSystem.None) {
            return;
        }
        console.log(`Activating ROS extension in "${exports.baseDir}"`);
        // Activate components when the ROS env is changed.
        context.subscriptions.push(exports.onDidChangeEnv(activateEnvironment));
        // Activate components which don't require the ROS env.
        context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider("cpp", new cpp_formatter_1.default()));
        // Source the environment, and re-source on config change.
        let config = utils.getConfig();
        context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => {
            const updatedConfig = utils.getConfig();
            const fields = Object.keys(config).filter(k => !(config[k] instanceof Function));
            const changed = fields.some(key => updatedConfig[key] !== config[key]);
            if (changed) {
                sourceRosAndWorkspace();
            }
            config = updatedConfig;
        }));
        sourceRosAndWorkspace();
        return {
            getBaseDir: () => exports.baseDir,
            getEnv: () => exports.env,
            onDidChangeEnv: (listener, thisArg) => exports.onDidChangeEnv(listener, thisArg),
        };
    });
}
exports.activate = activate;
function deactivate() {
    subscriptions.forEach(disposable => disposable.dispose());
}
exports.deactivate = deactivate;
/**
 * Determines build system and workspace path in use by checking for unique
 * auto-generated files.
 */
function determineBuildSystem(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        while (dir && path_1.dirname(dir) !== dir) {
            if (yield pfs.exists(`${dir}/.catkin_workspace`)) {
                exports.baseDir = dir;
                exports.buildSystem = BuildSystem.CatkinMake;
                return;
            }
            else if (yield pfs.exists(`${dir}/.catkin_tools`)) {
                exports.baseDir = dir;
                exports.buildSystem = BuildSystem.CatkinTools;
                return;
            }
            dir = path_1.dirname(dir);
        }
        exports.buildSystem = BuildSystem.None;
    });
}
/**
 * Activates components which require a ROS env.
 */
function activateEnvironment() {
    // Clear existing disposables.
    while (subscriptions.length > 0) {
        subscriptions.pop().dispose();
    }
    if (typeof exports.env.ROS_ROOT === "undefined") {
        return;
    }
    // Set up the master.
    const masterApi = new master.XmlRpcApi(exports.env.ROS_MASTER_URI);
    const masterStatusItem = new master.StatusBarItem(masterApi);
    const masterStatusProvider = new master.StatusDocumentProvider(context, masterApi);
    masterStatusItem.activate();
    subscriptions.push(masterStatusItem);
    subscriptions.push(vscode.workspace.registerTextDocumentContentProvider("ros-master", masterStatusProvider));
    subscriptions.push(vscode.workspace.registerTaskProvider("catkin", new catkin_task_provider_1.default()));
    subscriptions.push(vscode.debug.registerDebugConfigurationProvider("ros", new debug.RosDebugConfigProvider()));
    // Register commands.
    subscriptions.push(vscode.commands.registerCommand(constants.CMD_CREATE_CATKIN_PACKAGE, catkin.createPackage), vscode.commands.registerCommand(constants.CMD_CREATE_TERMINAL, utils.createTerminal), vscode.commands.registerCommand(constants.CMD_GET_DEBUG_SETTINGS, debug.getDebugSettings), vscode.commands.registerCommand(constants.CMD_SHOW_MASTER_STATUS, master.showMasterStatus), vscode.commands.registerCommand(constants.CMD_START_CORE, master.startCore), vscode.commands.registerCommand(constants.CMD_STOP_CORE, () => master.stopCore(masterApi)), vscode.commands.registerCommand(constants.CMD_UPDATE_CPP_PROPERTIES, build.updateCppProperties), vscode.commands.registerCommand(constants.CMD_UPDATE_PYTHON_PATH, build.updatePythonPath));
    // Generate config files if they don't already exist.
    build.createConfigFiles();
}
/**
 * Loads the ROS environment, and prompts the user to select a distro if required.
 */
function sourceRosAndWorkspace() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.env = undefined;
        const config = utils.getConfig();
        const distro = config.get("distro", "");
        if (distro) {
            try {
                exports.env = yield utils.sourceSetupFile(`/opt/ros/${distro}/setup.bash`, {});
            }
            catch (err) {
                vscode.window.showErrorMessage(`Could not source the setup file for ROS distro "${distro}".`);
            }
        }
        else if (typeof process.env.ROS_ROOT !== "undefined") {
            exports.env = process.env;
        }
        else {
            const message = "The ROS distro is not configured.";
            const configure = "Configure";
            if ((yield vscode.window.showErrorMessage(message, configure)) === configure) {
                config.update("distro", yield vscode.window.showQuickPick(utils.getDistros()));
            }
        }
        // Source the workspace setup over the top.
        const workspaceSetup = `${exports.baseDir}/devel/setup.bash`;
        if (exports.env && typeof exports.env.ROS_ROOT !== "undefined" && (yield pfs.exists(workspaceSetup))) {
            try {
                exports.env = yield utils.sourceSetupFile(workspaceSetup, exports.env);
            }
            catch (err) {
                vscode.window.showWarningMessage("Could not source the workspace setup file.");
            }
        }
        // Notify listeners the environment has changed.
        onEnvChanged.fire();
    });
}
//# sourceMappingURL=extension.js.map