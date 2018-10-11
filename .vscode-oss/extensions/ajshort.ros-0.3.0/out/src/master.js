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
const constants = require("./constants");
const extension = require("./extension");
const pfs = require("./promise-fs");
const cp = require("child_process");
const _ = require("underscore");
const vscode = require("vscode");
const xmlrpc = require("xmlrpc");
/**
 * Spawns a new roscore process.
 */
function startCore() {
    cp.spawn("roscore", [], { env: extension.env });
}
exports.startCore = startCore;
/**
 * Kills the roscore process.
 */
function stopCore(api) {
    api.getPid().then(pid => cp.exec(`kill $(ps -o ppid= -p '${pid}')`));
}
exports.stopCore = stopCore;
/**
 * Shows the master status in an editor view.
 */
function showMasterStatus() {
    return vscode.commands.executeCommand("vscode.previewHtml", vscode.Uri.parse("ros-master:"), undefined, "ROS Master");
}
exports.showMasterStatus = showMasterStatus;
const CALLER_ID = "vscode-ros";
/**
 * Exposes the ROS master XML-RPC api.
 */
class XmlRpcApi {
    constructor(uri) {
        this.client = xmlrpc.createClient(uri);
    }
    /**
     * Returns true if a master process is running.
     */
    check() {
        return this.getPid().then(() => true, () => false);
    }
    getPid() {
        return this.methodCall("getPid");
    }
    getSystemState() {
        return this.methodCall("getSystemState").then(res => ({
            publishers: _.object(res[0]),
            services: _.object(res[2]),
            subscribers: _.object(res[1]),
        }));
    }
    getParamNames() {
        return this.methodCall("getParamNames");
    }
    getParam(name) {
        return this.methodCall("getParam", name);
    }
    methodCall(method, ...args) {
        return new Promise((resolve, reject) => {
            this.client.methodCall(method, [CALLER_ID, ...args], (err, val) => {
                if (err) {
                    reject(err);
                }
                else if (val[0] !== 1) {
                    reject(val);
                }
                else {
                    resolve(val[2]);
                }
            });
        });
    }
}
exports.XmlRpcApi = XmlRpcApi;
/**
 * Shows the ROS master status in the status bar.
 */
class StatusBarItem {
    constructor(api) {
        this.api = api;
        this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 200);
        this.item.text = "$(question) ROS master";
        this.item.command = constants.CMD_SHOW_MASTER_STATUS;
    }
    activate() {
        this.item.show();
        this.timer = setInterval(() => this.update(), 200);
    }
    dispose() {
        this.item.dispose();
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.api.check();
            if (status === this.status) {
                return;
            }
            this.item.text = (status ? "$(check)" : "$(x)") + " ROS master";
            this.status = status;
        });
    }
}
exports.StatusBarItem = StatusBarItem;
/**
 * Shows parameters, topics and services in an editor view.
 */
class StatusDocumentProvider {
    constructor(context, api) {
        this.context = context;
        this.api = api;
    }
    provideTextDocumentContent(uri, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateFilename = this.context.asAbsolutePath("templates/master-status.html");
            const template = _.template(yield pfs.readFile(templateFilename, "utf-8"));
            let status = yield this.api.check();
            let data = { status, context: this.context };
            if (status) {
                const state = yield this.api.getSystemState();
                const params = yield this.api.getParam("/");
                data = Object.assign({}, data, state, { params });
            }
            return template(data);
        });
    }
}
exports.StatusDocumentProvider = StatusDocumentProvider;
//# sourceMappingURL=master.js.map