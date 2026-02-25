// Copy generated images from ComfyUI output to project images directory
// Converts PNG to WebP for smaller file sizes

import { execSync } from "child_process";
import { readdirSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const COMFYUI_OUTPUT = "D:/ComfyUI/ComfyUI/output";
const PROJECT_IMAGES = "C:/Users/shunp/tesla-deep-dive/public/images";
const GENERATED_DIR = join(PROJECT_IMAGES, "generated");

// Create generated directory for review
if (!existsSync(GENERATED_DIR)) mkdirSync(GENERATED_DIR, { recursive: true });

// Map of filename prefixes to final names
const PREFIX_MAP = {
  "laughing-crowd": "laughing-crowd",
  "russia-rocket-deal": "russia-rocket-deal",
  "airplane-window": "airplane-window",
  "co2-factory": "co2-factory",
  "ev-lifecycle-graph": "ev-lifecycle-graph",
  "empty-classroom": "empty-classroom",
  "ukraine-warzone": "ukraine-warzone",
  "colossus-datacenter": "colossus-datacenter",
  "starlink-orbit": "starlink-orbit",
  "traffic-jam": "traffic-jam",
  "ai-development-v2": "ai-development-v2",
  "ev-transition-v2": "ev-transition-v2",
  "energy-storage-v2": "energy-storage-v2",
  "fossil-fuel-v2": "fossil-fuel-v2",
  "intelligence-limits-v2": "intelligence-limits-v2",
  "population-decline-v2": "population-decline-v2",
  "mobility-inefficiency-v2": "mobility-inefficiency-v2",
  "underground-network-v2": "underground-network-v2",
  "info-finance-gap-v2": "info-finance-gap-v2",
  "global-connectivity-v2": "global-connectivity-v2",
  "free-speech-platform-v2": "free-speech-platform-v2",
  "single-planet-v2": "single-planet-v2",
  "spacex-crisis-v2": "spacex-crisis-v2",
  "rocket-success": "rocket-success",
  "falcon9-landing": "falcon9-landing",
  "chatgpt-screen": "chatgpt-screen",
  "case-for-mars-book": "case-for-mars-book",
  "vegas-loop-tunnel": "vegas-loop-tunnel",
  "megapack-aerial": "megapack-aerial",
  "starlink-terminal": "starlink-terminal",
  // Elon LoRA
  "elon-determined": "elon-determined",
  "elon-thinking": "elon-thinking",
  "elon-young-2001": "elon-young-2001",
  "elon-speaking": "elon-speaking",
  "elon-exhausted": "elon-exhausted",
  "elon-triumphant": "elon-triumphant",
  "elon-russia-meeting": "elon-russia-meeting",
  "elon-airplane-laptop": "elon-airplane-laptop",
};

const files = readdirSync(COMFYUI_OUTPUT).filter((f) => f.endsWith(".png"));
let copied = 0;

for (const file of files) {
  for (const [prefix, finalName] of Object.entries(PREFIX_MAP)) {
    if (file.startsWith(prefix + "_")) {
      const srcPath = join(COMFYUI_OUTPUT, file);
      const dstPath = join(GENERATED_DIR, `${finalName}.webp`);

      try {
        // Convert PNG to WebP using Python PIL
        execSync(
          `python3 -c "from PIL import Image; img=Image.open('${srcPath.replace(/\\/g, "/")}'); img.save('${dstPath.replace(/\\/g, "/")}', 'webp', quality=90)"`,
          { stdio: "pipe" }
        );
        console.log(`[OK] ${file} → ${finalName}.webp`);
        copied++;
      } catch (e) {
        console.error(`[ERR] ${file}: ${e.message}`);
      }
      break;
    }
  }
}

console.log(`\nDone: ${copied} images copied to ${GENERATED_DIR}`);
