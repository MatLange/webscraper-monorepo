"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJobItems = void 0;
const jobitem_1 = require("../dto/jobitem");
const extractElementByRule = function (htmlElement, rule) {
    if (!rule.selectorValue) {
        return htmlElement;
    }
    return htmlElement.querySelector(`.${rule.selectorValue}`);
};
const extractElementsByRule = function (htmlElement, rule) {
    if (!rule.selectorValue) {
        return htmlElement;
    }
    return htmlElement === null || htmlElement === void 0 ? void 0 : htmlElement.querySelectorAll(`.${rule.selectorValue}`);
};
const extractContentByRule = function (htmlElement, rule) {
    const element = rule.selectorValue
        ? htmlElement === null || htmlElement === void 0 ? void 0 : htmlElement.querySelector(`.${rule.selectorValue}`)
        : htmlElement;
    if (element) {
        return element[rule === null || rule === void 0 ? void 0 : rule.attribute];
    }
};
function capitalizeFirstLetter(string) {
    if (!string)
        return string; // Handle empty or null strings
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const extractJobItems = function (document, rules, baseUrl, websiteid) {
    const jobItems = [];
    const itemListRule = rules["itemList"];
    const itemListElement = extractElementByRule(document, itemListRule);
    const itemListItemsRule = rules["item"];
    const itemElements = extractElementsByRule(itemListElement, itemListItemsRule);
    (itemElements || []).forEach((itemElement) => {
        const jobItem = new jobitem_1.JobItem(baseUrl, websiteid);
        const attributeRuleKeys = Object.keys(rules).filter((key) => key !== "item" && key !== "itemList");
        attributeRuleKeys.forEach((key) => {
            const rule = rules[key];
            const content = extractContentByRule(itemElement, rule);
            if (content) {
                const functionName = "set" + capitalizeFirstLetter(key) || "";
                if (typeof jobItem[functionName] === "function") {
                    jobItem[functionName](String(content));
                }
            }
        });
        if (jobItem) {
            const tt = jobItem.getUrl() || "";
            //const url = jobItem.geturl();
            jobItems.push(jobItem);
        }
    });
    return jobItems;
};
exports.extractJobItems = extractJobItems;
//# sourceMappingURL=itemextractor.js.map