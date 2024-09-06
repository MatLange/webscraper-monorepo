"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
// supabaseClient.ts
// Load environment variables from .env.local file in development environment
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config({ path: ".env.local" });
}
// Create a single supabase client for interacting with your database
const supabase = (0, supabase_js_1.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
exports.default = supabase;
//# sourceMappingURL=supabaseClient.js.map