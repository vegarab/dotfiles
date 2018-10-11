"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extension = require("./extension");
const pfs = require("./promise-fs");
const cp = require("child_process");
const _ = require("underscore");
const vscode = require("vscode");
/**
 * Gets the ROS config section.
 */
function getConfig() {
    return vscode.workspace.getConfiguration("ros");
}
exports.getConfig = getConfig;
/**
 * Executes a setup file and returns the resulting env.
 */
function sourceSetupFile(filename, env) {
    return new Promise((resolve, reject) => {
        cp.exec(`bash -c "source '${filename}' && env"`, { env }, (err, out) => {
            if (!err) {
                resolve(out.split("\n").reduce((env, line) => {
                    const index = line.indexOf("=");
                    if (index !== -1) {
                        env[line.substr(0, index)] = line.substr(index + 1);
                    }
                    return env;
                }, {}));
            }
            else {
                reject(err);
            }
        });
    });
}
exports.sourceSetupFile = sourceSetupFile;
/**
 * Gets the names of installed distros.
 */
function getDistros() {
    return pfs.readdir("/opt/ros");
}
exports.getDistros = getDistros;
/**
 * Gets a map of package names to paths.
 */
function getPackages() {
    return new Promise((resolve, reject) => cp.exec("rospack list", { env: extension.env }, (err, out) => {
        if (!err) {
            resolve(_.object(out.trim().split("\n").map(line => line.split(" ", 2))));
        }
        else {
            reject(err);
        }
    }));
}
exports.getPackages = getPackages;
/**
 * Gets include dirs using `catkin_find`.
 */
function getIncludeDirs() {
    return new Promise((c, e) => cp.exec("catkin_find --include", { env: extension.env }, (err, out) => err ? e(err) : c(out.trim().split("\n"))));
}
exports.getIncludeDirs = getIncludeDirs;
/**
 * Gets the full path to any executables for a package.
 */
function findPackageExecutables(packageName) {
    const dirs = `catkin_find --without-underlays --libexec --share '${packageName}'`;
    const command = `find $(${dirs}) -type f -executable`;
    return new Promise((c, e) => cp.exec(command, { env: extension.env }, (err, out) => err ? e(err) : c(out.trim().split("\n"))));
}
exports.findPackageExecutables = findPackageExecutables;
/**
 * Finds all `.launch` files for a package..
 */
function findPackageLaunchFiles(packageName) {
    const dirs = `catkin_find --without-underlays --share '${packageName}'`;
    const command = `find $(${dirs}) -type f -name *.launch`;
    return new Promise((c, e) => cp.exec(command, { env: extension.env }, (err, out) => {
        err ? e(err) : c(out.trim().split("\n"));
    }));
}
exports.findPackageLaunchFiles = findPackageLaunchFiles;
/**
 * Creates and shows a ROS-sourced terminal.
 */
function createTerminal() {
    vscode.window.createTerminal({ name: 'ROS', env: extension.env }).show();
}
exports.createTerminal = createTerminal;
//# sourceMappingURL=utils.js.map