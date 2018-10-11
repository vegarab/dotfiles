"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extension = require("./extension");
const vscode = require("vscode");
/**
 * Provides catkin build and test tasks.
 */
class CatkinTaskProvider {
    provideTasks(token) {
        let buildCommand;
        let testCommand;
        if (extension.buildSystem === extension.BuildSystem.CatkinMake) {
            buildCommand = `catkin_make --directory "${extension.baseDir}"`;
            testCommand = `${buildCommand} run_tests`;
        }
        else if (extension.buildSystem === extension.BuildSystem.CatkinTools) {
            buildCommand = `catkin build --workspace "${extension.baseDir}"`;
            testCommand = `${buildCommand} --catkin-make-args run_tests`;
        }
        const make = new vscode.Task({ type: "catkin" }, "make", "catkin");
        make.execution = new vscode.ShellExecution(buildCommand, {
            env: extension.env
        });
        make.group = vscode.TaskGroup.Build;
        make.problemMatchers = ["$catkin-gcc"];
        const test = new vscode.Task({ type: "catkin", target: "run_tests" }, "run_tests", "catkin");
        test.execution = new vscode.ShellExecution(testCommand, {
            env: extension.env
        });
        test.group = vscode.TaskGroup.Test;
        return [make, test];
    }
    resolveTask(task, token) {
        return undefined;
    }
}
exports.default = CatkinTaskProvider;
//# sourceMappingURL=catkin-task-provider.js.map