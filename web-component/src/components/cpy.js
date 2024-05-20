// "use strict";

// var Console = {
//     time: function() {},
//     timeEnd: function() {},
//     log: function() {},
//     error: function(e) {
//         console.error(e);
//     }
// };

// (function(loaderUrl) {
//     function createBeePlugin(url) {
//         window.BeePlugin = new function() {
//             var baseUrl = url;
//             var currentUrl = url;
//             var config = {};
//             var token = {};
//             var hooks = {};
//             var container = {};
//             var instance = {};
//             var iframe = null;
//             var progressBar = null;

//             function initializeConfig() {
//                 instance = JSON.parse(JSON.stringify(Object.keys(container).reduce(function(acc, key) {
//                     var value = container[key];
//                     acc[key] = (typeof value === "function") ? "__client_function" : value;
//                     return acc;
//                 }, {})));
//             }

//             function handleMessage(event) {
//                 Console.log("[Loader] _handleMessage()", event);
//                 if (event && event.data && event.data.action && event.data.args) {
//                     switch (event.data.action) {
//                         case "onReady":
//                             Console.log("[Loader] _iframe.onload", instance);
//                             window.performance.mark("[Loader] _iframe.onload");
//                             sendMessage("init", { token: token, config: instance });
//                             updateProgressBar(100, 100);
//                             break;
//                         case "onContentDialog":
//                             if (container.contentDialog && container.contentDialog[event.data.args[0]]) {
//                                 var args = event.data.args[1] || {};
//                                 if (container.contentDialog[event.data.args[0]].handler) {
//                                     container.contentDialog[event.data.args[0]].handler.apply(window, [
//                                         function(successArgs, failureArgs) {
//                                             return sendMessage("resolveContentDialog", successArgs, failureArgs);
//                                         },
//                                         function(successArgs, failureArgs) {
//                                             return sendMessage("rejectContentDialog", successArgs, failureArgs);
//                                         },
//                                         args
//                                     ]);
//                                 } else {
//                                     sendMessage("rejectContentDialog");
//                                 }
//                             }
//                             break;
//                         case "onHook":
//                             if (container.hooks && container.hooks[event.data.args[0]]) {
//                                 var args = event.data.args[1] || {};
//                                 if (container.hooks[event.data.args[0]].handler) {
//                                     container.hooks[event.data.args[0]].handler.apply(window, [
//                                         function(successArgs) {
//                                             return sendMessage("resolveHook", successArgs);
//                                         },
//                                         function() {
//                                             return sendMessage("rejectHook");
//                                         },
//                                         args
//                                     ]);
//                                 } else {
//                                     sendMessage("rejectHook");
//                                 }
//                             }
//                             break;
//                         default:
//                             if (typeof container[event.data.action] === "function") {
//                                 container[event.data.action].apply(window, event.data.args);
//                             }
//                     }
//                 }
//             }

//             function createIframe(isVisible) {
//                 Console.log("[Loader] _createIframe", isVisible);
//                 iframe = document.createElement("iframe");
//                 iframe.id = config.container + "__bee-plugin-frame";
//                 var style = isVisible ? "height:100%;width:100%;min-width:1024px;border:0px" : "height:0px;width:0px;position:absolute;left:-9999px;";
//                 iframe.setAttribute("style", style);
//                 iframe.setAttribute("onmousewheel", "");
//                 iframe.src = currentUrl + "?appMode=" + getAppMode(token);
//                 if (config.logLevel) {
//                     iframe.src += "&logLevel=" + config.logLevel;
//                 }
//             }

//             function removeElementById(id) {
//                 var element = document.getElementById(config.container + "__bee-plugin-" + id);
//                 if (element) {
//                     instance.removeChild(element);
//                 }
//             }

//             function isObject(obj) {
//                 return obj && typeof obj === 'object' && !Array.isArray(obj);
//             }

//             function sendMessage(action, data, options) {
//                 Console.log("[Loader] _trigger", action);
//                 var messageData = {};
//                 if (action === "loadConfig" && isObject(data)) {
//                     config = deepMerge(config, data);
//                     messageData = deepCloneWithoutFunctions(data);
//                 } else {
//                     messageData = data;
//                 }
//                 iframe.contentWindow.postMessage({ action: action, data: messageData, options: options }, "*");
//             }

//             function handleOnInit() {
//                 Console.log("[Loader] _handleOnInit");
//                 if (this && typeof this === "function") {
//                     this(loaderUrl);
//                 }
//             }

//             function updateProgressBar(progress, duration) {
//                 Console.log("[Loader] _updateProgressBar", duration);
//                 clearInterval(progressBar);
//                 var settings = {
//                     delay: 10,
//                     duration: duration,
//                     delta: function(progress) {
//                         return 1 - Math.sin(Math.acos(progress));
//                     },
//                     step: function(delta) {
//                         progressBar.style.width = progress * delta + "%";
//                     }
//                 };
//                 Console.log("[Loader] _animate", settings);
//                 var start = new Date();
//                 progressBar = setInterval(function() {
//                     var progress = (new Date() - start) / settings.duration;
//                     var delta = settings.delta(progress > 1 ? 1 : progress);
//                     settings.step(delta);
//                     if (progress >= 1) {
//                         clearInterval(progressBar);
//                     }
//                 }, settings.delay || 10);
//             }

//             var BeePluginMethods = {
//                 start: function(template, options) {
//                     Console.log("[Loader] start", template);
//                     setHiddenStyles(container);
//                     setVisibleStyles(iframe);
//                     if (template) {
//                         sendMessage("load", instance ? template : { template: template, options: options });
//                     }
//                 },
//                 picker: function() {
//                     Console.log("[Loader] picker");
//                     setHiddenStyles(container);
//                     setVisibleStyles(iframe);
//                     sendMessage("picker", "");
//                 },
//                 load: function(template) {
//                     Console.log("[Loader] load", template);
//                     sendMessage("load", instance ? template : { template: template });
//                 },
//                 reload: function(template, options) {
//                     Console.log("[Loader] reload", template);
//                     sendMessage("reload", { template: template, options: options });
//                 },
//                 join: function(session) {
//                     Console.log("[Loader] join session", session);
//                     setHiddenStyles(container);
//                     setVisibleStyles(iframe);
//                     if (session) {
//                         sendMessage("join", session);
//                     }
//                 },
//                 save: function(data) {
//                     sendMessage("save", data || {});
//                 },
//                 saveAsTemplate: function() {
//                     sendMessage("saveAsTemplate", {});
//                 },
//                 send: function(data) {
//                     sendMessage("send", data || {});
//                 },
//                 preview: function() {
//                     sendMessage("preview", {});
//                 },
//                 togglePreview: function() {
//                     sendMessage("togglePreview", {});
//                 },
//                 switchPreview: function(data) {
//                     sendMessage("switchPreview", data || {});
//                 },
//                 switchTemplateLanguage: function(data) {
//                     sendMessage("switchTemplateLanguage", data || {});
//                 },
//                 toggleMergeTagsPreview: function() {
//                     sendMessage("toggleMergeTagsPreview", {});
//                 },
//                 toggleStructure: function() {
//                     sendMessage("toggleStructure", {});
//                 },
//                 toggleComments: function() {
//                     sendMessage("toggleComments", {});
//                 },
//                 loadWorkspace: function(data) {
//                     sendMessage("loadWorkspace", data);
//                 },
//                 loadStageMode: function(data) {
//                     sendMessage("loadStageMode", data);
//                 },
//                 loadConfig: function(data) {
//                     sendMessage("loadConfig", data);
//                 },
//                 getConfig: function() {
//                     return config;
//                 },
//                 exec: function(data) {
//                     sendMessage("exec", data);
//                 },
//                 showComment: function(data) {
//                     sendMessage("showComment", data);
//                 },
//                 loadRows: function(data) {
//                     sendMessage("loadRows", data);
//                 },
//                 updateToken: function(data) {
//                     sendMessage("updateToken", data);
//                 }
//             };

//             function deepMerge(target, source) {
//                 if (!source) return target;
//                 for (var key in source) {
//                     if (source.hasOwnProperty(key)) {
//                         if (isObject(source[key])) {
//                             if (!target[key]) Object.assign(target, { [key]: {} });
//                             deepMerge(target[key], source[key]);
//                         } else {
//                             Object.assign(target, { [key]: source[key] });
//                         }
//                     }
//                 }
//                 return target;
//             }

            // function deepCloneWithoutFunctions(obj) {
            //     var clone = {};
            //     Object.keys(obj).forEach(key => {
            //         if (isObject(obj[key])) {
            //             clone[key] =
