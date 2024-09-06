"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoProperties = void 0;
class AutoProperties {
    constructor(properties) {
        Object.assign(this, properties);
        return new Proxy(this, {
            get: (target, prop) => {
                if (prop in target) {
                    return target[prop];
                }
                if (prop.startsWith('get')) {
                    const key = prop.slice(3).toLowerCase();
                    return () => target[key];
                }
                if (prop.startsWith('set')) {
                    const key = prop.slice(3).toLowerCase();
                    return (value) => { target[key] = value; };
                }
                return undefined;
            },
            set: (target, prop, value) => {
                target[prop] = value;
                return true;
            }
        });
    }
}
exports.AutoProperties = AutoProperties;
;
//# sourceMappingURL=Autoproperties.js.map