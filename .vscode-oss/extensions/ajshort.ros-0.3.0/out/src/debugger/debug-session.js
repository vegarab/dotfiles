"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
const adapter = require("vscode-debugadapter");
class DebugSession extends adapter.DebugSession {
    shutdown() {
        if (this.process) {
            this.process.kill();
        }
        super.shutdown();
    }
    launchRequest(response, request) {
        if (request.command !== "roslaunch" && request.command !== "rosrun") {
            this.sendErrorResponse(response, 0, "Invalid command");
            return;
        }
        // Merge the ROS env with the current env so we aren't running in headless mode.
        const settings = JSON.parse(request.debugSettings);
        const env = Object.assign(process.env, settings.env || process.env);
        const args = [request.package, request.target].concat(request.args || []);
        this.process = cp.spawn(request.command, args, { env });
        this.process.stdout.on("data", chunk => this.sendEvent(new adapter.OutputEvent(chunk.toString(), "stdout")));
        this.process.stderr.on("data", chunk => this.sendEvent(new adapter.OutputEvent(chunk.toString(), "stderr")));
        this.process.on("error", (err) => {
            this.sendEvent(new adapter.OutputEvent(err.message, "stderr"));
            this.sendEvent(new adapter.TerminatedEvent());
        });
        this.process.on("exit", () => this.sendEvent(new adapter.TerminatedEvent()));
        this.sendResponse(response);
    }
}
exports.default = DebugSession;
//# sourceMappingURL=debug-session.js.map