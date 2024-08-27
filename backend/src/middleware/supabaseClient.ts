import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";

// supabaseClient.ts

// Load environment variables from .env.local file in development environment
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: ".env.local" });
}

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default supabase;