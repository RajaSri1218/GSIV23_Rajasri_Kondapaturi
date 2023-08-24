import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
// import "bootstrap/scss/bootstrap.scss";


const mount = (el) => {
    if (process.env.NODE_ENV != 'development' && process.env.NODE_ENV != 'local') {
        // console.log = function () { }
    }
    const root = createRoot(el);
    root.render(
        <Provider store={store} ><App /></Provider>
    );
}

const rootNode = document.querySelector("#root");
if (rootNode) {
    mount(rootNode);
}

export { mount }