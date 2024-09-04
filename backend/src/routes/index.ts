import * as Express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { chromium } from "playwright";
import { Page } from "playwright";
import { JSDOM } from "jsdom";
import { Database } from "../data/supabase";
import { JobItem } from "../dto/jobitem";
import { extractJobItems } from "../extractor/itemextractor";
import supabase from "../middleware/supabaseClient";

// Load environment variables from .env.local file
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: ".env.local" });
}

const table_websites = "websites";
const table_websitedata = "websitedata";
const table_jobdata = "websitedata";

var router = Express.Router();

async function readJobData(page:any, limit:any, maxItems: any  ) {
  const start = (page> 0) ? (page - 1) * limit : 0;
  const end = (page> 0) ? Math.min(start + limit - 1, (maxItems || 1) - 1) : 0;
  try {
    // Select all existing data from the table
    let { data, error: selectError } = 
    (page > 0) ? await supabase
      .from(`${table_jobdata}`)
      .select()
      .range(start, end) 
      :
      await supabase
      .from(`${table_jobdata}`)
      .select();      
    if (selectError) throw selectError;
    return data;
  } catch (error) {
    //console.error("Error:", error);
  }
}

async function readData() {
  
  try {
    // Select all existing data from the table
    let { data, error: selectError } = await supabase
      .from(`${table_websites}`)
      .select()
      .neq("id", 0);
    if (selectError) throw selectError;
    return data;
  } catch (error) {
    //console.error("Error:", error);
  }
}

async function resetData() {
  try {
    // Delete all existing data from the table
    let { error: deleteError } = await supabase
      .from(`${table_websitedata}`)
      .delete()
      .neq("id", 0);
    if (deleteError) throw deleteError;
  } catch (error) {
    //console.error("Error:", error);
  }
}

async function insertData(datasets: any[]) {
  try {
    // Filter and map data to match the schema
    const mappedData: Database["public"]["Tables"]["websitedata"]["Insert"][] =
      datasets.map((item: any) => ({
        baseurl: item.baseUrl,
        //created_at: item.created_at,
        duration: item.duration,
        //id: item.id,
        location: item.location,
        title: item.title,
        websiteid: parseInt(item.websiteid),
      }));

    // Insert new datasets into the table
    const { data, error: insertError } = await supabase
      .from(`${table_websitedata}`)
      .insert(mappedData);
    // Insert new datasets into the table
    if (insertError) throw insertError;

    //console.log("Data inserted successfully:", data);
  } catch (error) {
    //console.error("Error:", error);
  }
}

/* GET home page. */
router.get(
  "/",
  function (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    // Wrap the async code in an IIFE (Immediately Invoked Function Expression)
    (async () => {
      try {
        const page  = parseInt(req?.query?.page + "") || 0;
        const limit  = parseInt(req?.query?.limit + "") || 0;
        const maxItems = parseInt(req?.query?.maxItems + "") || 0;
        const data = (await readJobData(page, limit, maxItems)) || [];
        //const data = await scrapeWebsites(websites, req, res, next);
        //res.json();
        res.status(200).send({ message: "Data fetched successfully", data: data });

      } catch (err) {
        console.error("Error fetching data:", err);
        // Handle the error appropriately, e.g., send an error response
        res.status(500).send("Internal Server Error");
      }
    })();
  }
);

function getBaseUrl(url: string) {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}`;
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

const scrapeWebsite = async function (
  page: Page,
  website: any,
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    const websiteid = website?.id;
    const url = website?.url;
    const rules = website?.rules;

    await page.goto(url);

    const baseUrl = getBaseUrl(page.url());
    await page.waitForTimeout(5000);

    const pageContent = await page.content();

    const dom = new JSDOM(pageContent);
    const htmlDocument = dom.window.document;
    const responseDTOs = extractJobItems(
      htmlDocument,
      rules,
      baseUrl,
      websiteid
    );

    return responseDTOs;
  } catch (err) {
    console.error("Error:", err);
    //res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function processWebsites(
  page: Page,
  websites: any[],
  req: any,
  res: any,
  next: any
) {
  const websiteJobItems: { [key: string]: JobItem[] } = {};
  for (const website of websites) {
    const responseDTOs = await scrapeWebsite(page, website, req, res, next);
    websiteJobItems[website.url] = responseDTOs || [];
    console.log("JobItems:", responseDTOs);
  }
  return websiteJobItems;
}

const scrapeWebsites = async function (
  websites: any[],
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const headers: Map<string, string> = new Map<string, string>();
  headers.set(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
  );
  context.setExtraHTTPHeaders(Object.fromEntries(headers));
  const page: Page = await context.newPage();

  const websiteJobItems = await processWebsites(page, websites, req, res, next);
  const flattenedData = Object.values(websiteJobItems).flat() || [];

  await resetData();
  await insertData(flattenedData);

  await page.close();
  await browser.close();
  return flattenedData;
};

//module.exports = router;
export { router as indexRouter };
