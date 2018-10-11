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
const pfs = require("./promise-fs");
const utils = require("./utils");
const path = require("path");
const _ = require("underscore");
const vscode = require("vscode");
const PYTHON_AUTOCOMPLETE_PATHS = "python.autoComplete.extraPaths";
/**
 * Creates config files which don't exist.
 */
function createConfigFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const config = vscode.workspace.getConfiguration();
        // Update the Python path if required.
        if (config.get(PYTHON_AUTOCOMPLETE_PATHS, []).length === 0) {
            updatePythonPath();
        }
        // Ensure the ".vscode" directory exists then update the C++ path.
        const dir = path.join(vscode.workspace.rootPath, ".vscode");
        if (!(yield pfs.exists(dir))) {
            yield pfs.mkdir(dir);
        }
        pfs.exists(path.join(dir, "c_cpp_properties.json")).then(exists => {
            if (!exists) {
                updateCppProperties();
            }
        });
    });
}
exports.createConfigFiles = createConfigFiles;
/**
 * Updates the `c_cpp_properties.json` file with ROS include paths.
 */
function updateCppProperties() {
    return __awaiter(this, void 0, void 0, function* () {
        const includes = yield utils.getIncludeDirs();
        const filename = vscode.workspace.rootPath + "/.vscode/c_cpp_properties.json";
        // Get all packages within the workspace, and check if they have an include
        // directory. If so, add them to the list.
        const packages = yield utils.getPackages().then(pkgs => _.values(pkgs).filter(pkg => pkg.startsWith(extension.baseDir)));
        yield Promise.all(packages.map(pkg => {
            const include = path.join(pkg, "include");
            return pfs.exists(include).then(exists => {
                if (exists) {
                    includes.push(include);
                }
            });
        }));
        yield pfs.writeFile(filename, JSON.stringify({
            configurations: [
                {
                    browse: { databaseFilename: "", limitSymbolsToIncludedHeaders: true },
                    includePath: [...includes, "/usr/include"],
                    name: "Linux",
                },
            ],
        }, undefined, 2));
    });
}
exports.updateCppProperties = updateCppProperties;
/**
 * Updates the python autocomplete path to support ROS.
 */
function updatePythonPath() {
    vscode.workspace.getConfiguration().update(PYTHON_AUTOCOMPLETE_PATHS, extension.env.PYTHONPATH.split(":"));
}
exports.updatePythonPath = updatePythonPath;
//# sourceMappingURL=build.js.map