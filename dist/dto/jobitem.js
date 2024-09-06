"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobItem = void 0;
const Autoproperties_1 = require("./Autoproperties");
class JobItem extends Autoproperties_1.AutoProperties {
    //[key: string]: string | null | ((value: string) => void); // Update index signature
    constructor(baseUrl, websiteid) {
        super({ websiteid: websiteid, title: "", baseUrl: baseUrl, url: "", location: "", date: null, duration: null });
        this.websiteid = null;
        this.title = null;
        this.baseUrl = null;
        this.url = null;
        this.location = null;
        this.date = null;
        this.duration = null;
        return this;
    }
}
exports.JobItem = JobItem;
;
//# sourceMappingURL=jobitem.js.map