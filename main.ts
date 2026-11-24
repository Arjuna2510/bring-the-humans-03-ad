import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const videoPath = join(import.meta.dirname, "VIDEO.json");
const video = JSON.parse(readFileSync(videoPath, "utf8")) as unknown;
if (
  typeof video !== "object" ||
  video === null ||
  typeof (video as { url?: unknown }).url !== "string" ||
  !/^https:\/\/(www\.|m\.)?tiktok\.com\/@[^/]+\/video\/\d+$/.test(
    (video as { url: string }).url,
  )
) {
  throw new Error(
    "VIDEO.json must hold a TikTok video url like https://www.tiktok.com/@handle/video/<id>",
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(videoPath, join(outDir, "VIDEO.json"));
