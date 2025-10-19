// lib/notion.js
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getTimelineData(databaseId) {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return response.results.map((item) => ({
    id: item.id,
    title:
      item.properties["Event Name"]?.title?.[0]?.plain_text || "Tanpa Judul",
    startDate: item.properties.Date?.date?.start || null,
    endDate: item.properties.Date?.date?.end || null,
    location:
      item.properties["Event Location"]?.rich_text?.[0]?.plain_text || "",
    status: item.properties["Status Agenda"]?.status?.name || "",
    jenis: item.properties["Jenis Agenda"]?.select?.name || "",
    tasks: item.properties["Tasks"]?.rich_text?.[0]?.plain_text || "",
    attendees:
      item.properties["Attendees"]?.people?.map((p) => p.name).join(", ") || "",
  }));
}
