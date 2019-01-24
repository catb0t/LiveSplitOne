import * as React from "react";
import * as ReactDOM from "react-dom";

import { toast, ToastContainer } from "react-toastify";
import { load } from "./livesplit";
import { LiveSplit } from "./ui/LiveSplit";

import { open_url_as_string } from "./util/FileUtil";

import "react-toastify/dist/ReactToastify.css";
import "./css/font-awesome.css";
import "./css/livesplit.css";

async function inject_autonomous () {
  const inject_js = await open_url_as_string("https://raw.githubusercontent.com/catb0t/gta-livesplit-extras/master/livesplit.js");
  console.log("cross-site script file: " + inject_js.slice(0, 40).replace("\n", "") + "...");
  eval(inject_js);
}

async function run() {
    try {
        await load("livesplit_core.wasm");

        ReactDOM.render(
            <div>
                <LiveSplit />
                <ToastContainer
                    position={toast.POSITION.BOTTOM_RIGHT}
                    toastClassName="toast-class"
                    bodyClassName="toast-body"
                    style={{
                        textShadow: "none",
                    }}
                />
            </div>,
            document.getElementById("base"),
        );

        console.log("livesplit rendered");

        await inject_autonomous();

        console.log("inject autonomous finished")

    } catch (_) {
        alert(`Couldn't load LiveSplit One. \
You may be using a browser that doesn't support WebAssembly. \
Alternatively, you may be using an Adblocker like uBlock Origin. \
Those are known to block WebAssembly.`);
    }
}

ReactDOM.render(
    <div>
        Loading...
    </div>,
    document.getElementById("base"),
);

run();
