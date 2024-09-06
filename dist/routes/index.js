"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const Express = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const playwright_1 = require("playwright");
const jsdom_1 = require("jsdom");
const itemextractor_1 = require("../extractor/itemextractor");
const supabaseClient_1 = __importDefault(require("../middleware/supabaseClient"));
// Load environment variables from .env.local file
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config({ path: ".env.local" });
}
const table_websites = "websites";
const table_websitedata = "websitedata";
const table_jobdata = "websitedata";
var router = Express.Router();
exports.indexRouter = router;
function readJobData(page, limit, maxItems) {
    return __awaiter(this, void 0, void 0, function* () {
        const start = (page > 0) ? (page - 1) * limit : 0;
        const end = (page > 0) ? Math.min(start + limit - 1, (maxItems || 1) - 1) : 0;
        try {
            // Select all existing data from the table
            let { data, error: selectError } = (page > 0) ? yield supabaseClient_1.default
                .from(`${table_jobdata}`)
                .select()
                .range(start, end)
                :
                    yield supabaseClient_1.default
                        .from(`${table_jobdata}`)
                        .select();
            if (selectError)
                throw selectError;
            return data;
        }
        catch (error) {
            //console.error("Error:", error);
        }
    });
}
function readData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Select all existing data from the table
            let { data, error: selectError } = yield supabaseClient_1.default
                .from(`${table_websites}`)
                .select()
                .neq("id", 0);
            if (selectError)
                throw selectError;
            return data;
        }
        catch (error) {
            //console.error("Error:", error);
        }
    });
}
function resetData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Delete all existing data from the table
            let { error: deleteError } = yield supabaseClient_1.default
                .from(`${table_websitedata}`)
                .delete()
                .neq("id", 0);
            if (deleteError)
                throw deleteError;
        }
        catch (error) {
            //console.error("Error:", error);
        }
    });
}
function insertData(datasets) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Filter and map data to match the schema
            const mappedData = datasets.map((item) => ({
                baseurl: item.baseUrl,
                //created_at: item.created_at,
                duration: item.duration,
                //id: item.id,
                location: item.location,
                title: item.title,
                websiteid: parseInt(item.websiteid),
            }));
            // Insert new datasets into the table
            const { data, error: insertError } = yield supabaseClient_1.default
                .from(`${table_websitedata}`)
                .insert(mappedData);
            // Insert new datasets into the table
            if (insertError)
                throw insertError;
            //console.log("Data inserted successfully:", data);
        }
        catch (error) {
            //console.error("Error:", error);
        }
    });
}
/* GET home page. */
router.get("/", function (req, res, next) {
    // Wrap the async code in an IIFE (Immediately Invoked Function Expression)
    (() => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const page = parseInt(((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page) + "") || 0;
            const limit = parseInt(((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.limit) + "") || 0;
            const maxItems = parseInt(((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.maxItems) + "") || 0;
            const data = (yield readJobData(page, limit, maxItems)) || [];
            //const data = await scrapeWebsites(websites, req, res, next);
            //res.json();
            res.status(200).send({ message: "Data fetched successfully", data: data });
        }
        catch (err) {
            console.error("Error fetching data:", err);
            // Handle the error appropriately, e.g., send an error response
            res.status(500).send("Internal Server Error");
        }
    }))();
});
function getBaseUrl(url) {
    try {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.hostname}`;
    }
    catch (error) {
        console.error("Invalid URL:", error);
        return null;
    }
}
const scrapeWebsite = function (page, website, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const websiteid = website === null || website === void 0 ? void 0 : website.id;
            const url = website === null || website === void 0 ? void 0 : website.url;
            const rules = website === null || website === void 0 ? void 0 : website.rules;
            yield page.goto(url);
            const baseUrl = getBaseUrl(page.url());
            yield page.waitForTimeout(5000);
            const pageContent = yield page.content();
            const dom = new jsdom_1.JSDOM(pageContent);
            const htmlDocument = dom.window.document;
            const responseDTOs = (0, itemextractor_1.extractJobItems)(htmlDocument, rules, baseUrl, websiteid);
            return responseDTOs;
        }
        catch (err) {
            console.error("Error:", err);
            //res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
function processWebsites(page, websites, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const websiteJobItems = {};
        for (const website of websites) {
            const responseDTOs = yield scrapeWebsite(page, website, req, res, next);
            websiteJobItems[website.url] = responseDTOs || [];
            console.log("JobItems:", responseDTOs);
        }
        return websiteJobItems;
    });
}
const scrapeWebsites = function (websites, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield playwright_1.chromium.launch();
        const context = yield browser.newContext();
        const headers = new Map();
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3");
        context.setExtraHTTPHeaders(Object.fromEntries(headers));
        const page = yield context.newPage();
        const websiteJobItems = yield processWebsites(page, websites, req, res, next);
        const flattenedData = Object.values(websiteJobItems).flat() || [];
        yield resetData();
        yield insertData(flattenedData);
        yield page.close();
        yield browser.close();
        return flattenedData;
    });
};
//# sourceMappingURL=index.js.map