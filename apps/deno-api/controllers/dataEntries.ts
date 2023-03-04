import { BankDataEntry } from "../types.ts";
import { RecipientCategory } from "../types.ts";

const fileNameBankDataEntries = "data/entries.json";
const fileNameCategoryMap = "data/categoryMap.json";

const fetchCategoryMap = async ({ response }: any) => {
  const text = await Deno.readTextFile(fileNameCategoryMap);
  const entries: RecipientCategory[] = JSON.parse(text);

  response.status = 200;
  response.body = {
    success: true,
    data: entries,
  };
};

const saveCategoryMap = async (
  { request, response }: { request: any; response: any },
) => {
  const body = request.body();
  const values: RecipientCategory[] = await body.value;
  if (request.hasBody) {
    Deno.writeTextFileSync(fileNameCategoryMap, JSON.stringify(values));

    response.status = 201;
    response.body = {
      success: true,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
    };
  }
};

const fetchAllDataEntries = async ({ response }: any) => {
  const text = await Deno.readTextFile(fileNameBankDataEntries);
  const entries: BankDataEntry[] = JSON.parse(text);

  // console.log(JSON.stringify(entries[0]));

  response.status = 200;
  response.body = {
    success: true,
    data: entries,
  };
};

const saveAllDataEntries = async (
  { request, response }: { request: any; response: any },
) => {
  const body = request.body();
  const values: BankDataEntry[] = await body.value;
  if (request.hasBody) {
    const newBankDataEntries = values;
    Deno.writeTextFileSync(fileNameBankDataEntries, JSON.stringify(newBankDataEntries));

    response.status = 201;
    response.body = {
      success: true,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
    };
  }
};

const appendAllDataEntries = async (
  { request, response }: { request: any; response: any },
) => {
  const body = request.body();
  const values: BankDataEntry[] = await body.value;
  if (request.hasBody) {
    let newBankDataEntries = values;

    console.log('entries to add: ' + newBankDataEntries.length);

    const oldEntriesText = await Deno.readTextFile(fileNameBankDataEntries);
    const oldEntries: BankDataEntry[] = JSON.parse(oldEntriesText);

    console.log('number of old entries: ' + oldEntries.length);
    newBankDataEntries = oldEntries.concat(newBankDataEntries);
    console.log('total new number of entries: ' + newBankDataEntries.length);

    Deno.writeTextFileSync(fileNameBankDataEntries, JSON.stringify(newBankDataEntries));

    response.status = 201;
    response.body = {
      success: true,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
    };
  }
};

export {
  fetchAllDataEntries,
  fetchCategoryMap,
  saveAllDataEntries,
  saveCategoryMap,
  appendAllDataEntries
};
