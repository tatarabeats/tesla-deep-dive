// ComfyUI batch image generation for Tesla Deep Dive v17
// Uses FLUX.2 Klein 9B via ComfyUI API

const COMFYUI_URL = "http://127.0.0.1:8188";
const OUTPUT_DIR = "C:/Users/shunp/tesla-deep-dive/public/images";

// Base workflow (no LoRA)
function makePrompt(text, seed, width = 1344, height = 768, prefix = "tesla") {
  return {
    prompt: {
      "1": {
        class_type: "UnetLoaderGGUF",
        inputs: { unet_name: "flux-2-klein-9b-Q5_K_M.gguf" },
      },
      "2": {
        class_type: "CLIPLoader",
        inputs: {
          clip_name: "qwen_3_8b_fp8mixed.safetensors",
          type: "flux2",
        },
      },
      "3": {
        class_type: "VAELoader",
        inputs: { vae_name: "flux2-vae.safetensors" },
      },
      "4": {
        class_type: "CLIPTextEncode",
        inputs: { text, clip: ["2", 0] },
      },
      "5": {
        class_type: "EmptyLatentImage",
        inputs: { width, height, batch_size: 1 },
      },
      "6": {
        class_type: "KSampler",
        inputs: {
          model: ["1", 0],
          positive: ["4", 0],
          negative: ["4", 0],
          latent_image: ["5", 0],
          seed,
          control_after_generate: "fixed",
          steps: 4,
          cfg: 1.0,
          sampler_name: "euler",
          scheduler: "simple",
          denoise: 1.0,
        },
      },
      "7": {
        class_type: "VAEDecode",
        inputs: { samples: ["6", 0], vae: ["3", 0] },
      },
      "8": {
        class_type: "SaveImage",
        inputs: { images: ["7", 0], filename_prefix: prefix },
      },
    },
  };
}

// Workflow WITH Elon LoRA
function makePromptWithLora(
  text,
  seed,
  width = 768,
  height = 1024,
  prefix = "tesla_elon",
  loraStrength = 0.85
) {
  return {
    prompt: {
      "1": {
        class_type: "UnetLoaderGGUF",
        inputs: { unet_name: "flux-2-klein-9b-Q5_K_M.gguf" },
      },
      "2": {
        class_type: "CLIPLoader",
        inputs: {
          clip_name: "qwen_3_8b_fp8mixed.safetensors",
          type: "flux2",
        },
      },
      "3": {
        class_type: "VAELoader",
        inputs: { vae_name: "flux2-vae.safetensors" },
      },
      "9": {
        class_type: "LoraLoaderModelOnly",
        inputs: {
          model: ["1", 0],
          lora_name: "elon-musk-flux.safetensors",
          strength_model: loraStrength,
        },
      },
      "4": {
        class_type: "CLIPTextEncode",
        inputs: { text, clip: ["2", 0] },
      },
      "5": {
        class_type: "EmptyLatentImage",
        inputs: { width, height, batch_size: 1 },
      },
      "6": {
        class_type: "KSampler",
        inputs: {
          model: ["9", 0],
          positive: ["4", 0],
          negative: ["4", 0],
          latent_image: ["5", 0],
          seed,
          control_after_generate: "fixed",
          steps: 4,
          cfg: 1.0,
          sampler_name: "euler",
          scheduler: "simple",
          denoise: 1.0,
        },
      },
      "7": {
        class_type: "VAEDecode",
        inputs: { samples: ["6", 0], vae: ["3", 0] },
      },
      "8": {
        class_type: "SaveImage",
        inputs: { images: ["7", 0], filename_prefix: prefix },
      },
    },
  };
}

// ═══════════════════════════════════════════
// IMAGE GENERATION QUEUE
// ═══════════════════════════════════════════

const jobs = [
  // --- SCENE BACKGROUNDS (Landscape 1344x768, no LoRA) ---
  {
    name: "laughing-crowd",
    prompt:
      "A group of wealthy businessmen and aerospace executives sitting around a conference table, laughing mockingly and dismissively, some pointing, arrogant expressions, suits and ties, dimly lit corporate boardroom, 2002 era, photorealistic, cinematic lighting, shallow depth of field",
    seed: 2002,
    w: 1344,
    h: 768,
  },
  {
    name: "russia-rocket-deal",
    prompt:
      "A tense meeting in a dimly lit Russian military office, Moscow, ornate Soviet-era decor, Russian officials in uniforms sitting across a table with documents and vodka glasses, cold atmosphere, suspicion, 2001 era, cinematic lighting, photorealistic, warm tungsten lights",
    seed: 2001,
    w: 1344,
    h: 768,
  },
  {
    name: "airplane-window",
    prompt:
      "Interior of a commercial airplane, window seat view, looking out at clouds far below, a laptop open on the tray table showing a spreadsheet, dramatic sunset light streaming through the oval window, photorealistic, cinematic, contemplative mood",
    seed: 7777,
    w: 1344,
    h: 768,
  },
  {
    name: "co2-factory",
    prompt:
      "Massive industrial complex with towering smokestacks belching thick dark smoke and CO2 emissions into an orange polluted sky, power plant, coal burning facility, dystopian atmosphere, aerial view, photorealistic, dramatic cinematic lighting",
    seed: 3740,
    w: 1344,
    h: 768,
  },
  {
    name: "ev-lifecycle-graph",
    prompt:
      "A clean infographic chart comparing EV vs gasoline car CO2 emissions over vehicle lifetime, dark background with glowing neon data lines, one line green (EV) starting higher then dropping below, one line red (gasoline) staying high, modern data visualization style, sleek minimal design",
    seed: 6300,
    w: 1344,
    h: 768,
  },
  {
    name: "empty-classroom",
    prompt:
      "An empty Japanese school classroom, rows of wooden desks and chairs with no students, dust particles floating in golden afternoon sunlight streaming through large windows, cherry blossoms visible outside, melancholy atmosphere, photorealistic, cinematic",
    seed: 120,
    w: 1344,
    h: 768,
  },
  {
    name: "ukraine-warzone",
    prompt:
      "A destroyed urban street in Ukraine, bombed apartment buildings with collapsed walls, rubble and debris, smoke rising in the background, overcast grey sky, abandoned cars, war zone atmosphere, 2022, photojournalistic style, photorealistic",
    seed: 2022,
    w: 1344,
    h: 768,
  },
  {
    name: "colossus-datacenter",
    prompt:
      "Interior of a massive data center facility, endless rows of server racks with blue and green LED lights glowing, industrial scale computing infrastructure, cables overhead, cool blue lighting, Memphis Tennessee xAI Colossus supercomputer, photorealistic, wide angle",
    seed: 2024,
    w: 1344,
    h: 768,
  },
  {
    name: "starlink-orbit",
    prompt:
      "Hundreds of small Starlink satellites in low Earth orbit, viewed from space, Earth's blue curved horizon below with city lights visible, satellites forming a train of lights against the dark cosmos, stars in background, photorealistic space photography style",
    seed: 9400,
    w: 1344,
    h: 768,
  },
  {
    name: "traffic-jam",
    prompt:
      "Massive traffic congestion on a multi-lane highway, hundreds of cars bumper to bumper, aerial drone view, Los Angeles style urban sprawl, sunset golden hour light, smog in the air, photorealistic, cinematic wide shot",
    seed: 5100,
    w: 1344,
    h: 768,
  },
  // --- REGENERATE OLD 512x512 AT HIGHER QUALITY ---
  {
    name: "ai-development-v2",
    prompt:
      "A futuristic AI research laboratory, holographic neural network visualizations floating in the air, researchers working at glowing terminals, dark room with blue and purple ambient lighting, cutting edge technology, photorealistic, cinematic, wide shot",
    seed: 2015,
    w: 1344,
    h: 768,
  },
  {
    name: "ev-transition-v2",
    prompt:
      "A sleek Tesla Roadster sports car driving on an open highway at high speed, electric blue energy trails, modern futuristic aesthetic, sunset background, motion blur, photorealistic, cinematic, dramatic lighting",
    seed: 2008,
    w: 1344,
    h: 768,
  },
  {
    name: "energy-storage-v2",
    prompt:
      "A massive Tesla Megapack battery storage facility, rows of white battery units in a desert landscape, solar panels in the background, clear blue sky, industrial scale energy storage, photorealistic, wide angle, cinematic lighting",
    seed: 3900,
    w: 1344,
    h: 768,
  },
  {
    name: "fossil-fuel-v2",
    prompt:
      "Split image: left side shows a beautiful pristine natural landscape with green forests and clear sky, right side shows the same landscape transformed into an industrial wasteland with oil refineries and smoke, environmental contrast, dramatic, photorealistic, cinematic",
    seed: 374,
    w: 1344,
    h: 768,
  },
  {
    name: "intelligence-limits-v2",
    prompt:
      "A dramatic visualization of artificial intelligence, a glowing digital brain made of circuits and neural pathways, surrounded by streaming data and code, dark background with red and purple warning tones, existential threat atmosphere, photorealistic CGI style",
    seed: 1000,
    w: 1344,
    h: 768,
  },
  {
    name: "population-decline-v2",
    prompt:
      "An empty playground in a modern city, swings hanging still, no children, autumn leaves scattered, overcast sky, apartment buildings in background, lonely atmosphere, declining birth rate metaphor, photorealistic, melancholy mood, cinematic",
    seed: 72,
    w: 1344,
    h: 768,
  },
  {
    name: "mobility-inefficiency-v2",
    prompt:
      "Split view: top shows a 3D city with buildings towering upward, bottom shows flat 2D roads packed with traffic at ground level, contrast between vertical city and horizontal congestion, architectural visualization style, dramatic lighting, dark background",
    seed: 5151,
    w: 1344,
    h: 768,
  },
  {
    name: "underground-network-v2",
    prompt:
      "Cross-section view of an underground tunnel network beneath a city, multiple levels of illuminated tunnels with vehicles moving through them, buildings and streets visible above ground, futuristic infrastructure, Boring Company style, photorealistic architectural render",
    seed: 1010,
    w: 1344,
    h: 768,
  },
  {
    name: "info-finance-gap-v2",
    prompt:
      "A remote African village at night, a single smartphone screen glowing brightly in a child's hands, no other light source, stars visible above, digital divide metaphor, the world connected by a tiny screen, emotional, photorealistic, cinematic lighting",
    seed: 2200,
    w: 1344,
    h: 768,
  },
  {
    name: "global-connectivity-v2",
    prompt:
      "Earth from space at night, glowing network lines connecting continents showing internet connectivity, Starlink satellites visible as dots of light in orbit, beautiful space photography, deep blue and golden lights, photorealistic",
    seed: 6000,
    w: 1344,
    h: 768,
  },
  {
    name: "free-speech-platform-v2",
    prompt:
      "A massive glowing X logo hovering above a diverse crowd of people from around the world, all holding smartphones, connecting digitally, urban plaza setting, night scene with dramatic blue and white lighting, photorealistic, cinematic wide shot",
    seed: 4400,
    w: 1344,
    h: 768,
  },
  {
    name: "single-planet-v2",
    prompt:
      "Planet Earth floating alone in the vast dark emptiness of space, small and fragile, no other planets nearby, deep black cosmos with distant stars, emphasizing isolation and vulnerability, photorealistic space photography, cinematic",
    seed: 4500,
    w: 1344,
    h: 768,
  },
  {
    name: "spacex-crisis-v2",
    prompt:
      "A rocket exploding in a fireball on a launch pad, debris flying outward, smoke and flames, dramatic failure moment, SpaceX Falcon 1 style rocket, Kwajalein atoll tropical setting, photorealistic, high speed photography style, dramatic",
    seed: 2006,
    w: 1344,
    h: 768,
  },
  {
    name: "rocket-success",
    prompt:
      "A small rocket successfully reaching space, engine exhaust trail stretching down to Earth below, the rocket ascending triumphantly into the dark starry sky, Earth's atmosphere glowing blue at the horizon, dramatic upward angle, photorealistic, inspiring moment",
    seed: 2008,
    w: 1344,
    h: 768,
  },
  {
    name: "falcon9-landing",
    prompt:
      "A SpaceX Falcon 9 rocket booster landing vertically on a drone ship at sea, flames from the engine, the rocket perfectly upright, ocean waves around the landing platform, dramatic sunset lighting, photorealistic, cinematic, historic moment",
    seed: 2015,
    w: 1344,
    h: 768,
  },
  {
    name: "chatgpt-screen",
    prompt:
      "A laptop screen showing an AI chatbot interface with a conversation, glowing text on dark background, the screen illuminating a dark room, dramatic lighting from the screen only, photorealistic, shallow depth of field, 2022 tech aesthetic",
    seed: 1100,
    w: 1344,
    h: 768,
  },
  {
    name: "case-for-mars-book",
    prompt:
      "A worn paperback book lying open on a desk, titled The Case for Mars, with diagrams of Mars habitats and rockets visible on the pages, warm desk lamp lighting, coffee cup nearby, late night reading atmosphere, 2001 era, photorealistic",
    seed: 1999,
    w: 1344,
    h: 768,
  },
  {
    name: "vegas-loop-tunnel",
    prompt:
      "Interior of a futuristic underground tunnel with smooth white walls and colorful LED lighting, a Tesla car driving through the illuminated tunnel, Las Vegas Boring Company Loop, clean minimalist design, photorealistic, wide angle lens",
    seed: 8888,
    w: 1344,
    h: 768,
  },
  {
    name: "megapack-aerial",
    prompt:
      "Aerial view of a massive battery storage facility in the Australian outback, hundreds of white Tesla Megapack units arranged in precise rows, red desert landscape surrounding, clear blue sky, industrial scale, photorealistic drone photography",
    seed: 1300,
    w: 1344,
    h: 768,
  },
  {
    name: "starlink-terminal",
    prompt:
      "A white Starlink satellite dish antenna mounted on a rooftop in a rural area, connected and operational with a small LED light, clear sky background, simple setup, photorealistic product photography style, clean composition",
    seed: 550,
    w: 1344,
    h: 768,
  },
];

// --- ELON PORTRAIT VARIANTS (with LoRA, Portrait 768x1024) ---
const elonJobs = [
  {
    name: "elon-determined",
    prompt:
      "elonmusk, a man in a dark t-shirt, intense determined expression, looking straight at camera, dramatic side lighting, dark background, close-up portrait, photorealistic, 4k, high detail",
    seed: 42,
  },
  {
    name: "elon-thinking",
    prompt:
      "elonmusk, a man sitting in a leather chair, hand on chin, deep in thought, contemplative expression, warm office lighting, bookshelves in background, medium shot portrait, photorealistic",
    seed: 777,
  },
  {
    name: "elon-young-2001",
    prompt:
      "elonmusk, a young man in his late 20s, wearing a casual button-down shirt, slightly nervous but excited expression, early 2000s aesthetic, office setting, natural lighting, portrait, photorealistic",
    seed: 2001,
  },
  {
    name: "elon-speaking",
    prompt:
      "elonmusk, a man giving a passionate speech on stage, gesturing with one hand, microphone headset, dramatic stage lighting with blue and white spotlights, dark audience in background, medium shot, photorealistic",
    seed: 3141,
  },
  {
    name: "elon-exhausted",
    prompt:
      "elonmusk, a man looking exhausted and stressed, dark circles under eyes, rumpled black t-shirt, sitting at a desk covered in papers, dim overhead light, late night, raw emotional portrait, photorealistic",
    seed: 2008,
  },
  {
    name: "elon-triumphant",
    prompt:
      "elonmusk, a man with a wide genuine smile, fist raised in celebration, wearing a SpaceX jacket, crowd cheering behind him blurred, dramatic backlighting, victory moment, portrait, photorealistic",
    seed: 928,
  },
  {
    name: "elon-russia-meeting",
    prompt:
      "elonmusk, a young man in a suit sitting across from Russian military officials at a dark wooden table, tense negotiation scene, Moscow office with Soviet decor, warm tungsten lighting, medium shot, photorealistic, 2001 era",
    seed: 2001,
    w: 1344,
    h: 768,
  },
  {
    name: "elon-airplane-laptop",
    prompt:
      "elonmusk, a young man sitting in an airplane seat by the window, looking down at a laptop screen with spreadsheet data, clouds visible through the oval window, focused expression, warm cabin lighting, 2001 era, medium shot, photorealistic",
    seed: 7777,
    w: 1344,
    h: 768,
  },
];

async function queuePrompt(promptData) {
  const res = await fetch(`${COMFYUI_URL}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(promptData),
  });
  return res.json();
}

async function waitForCompletion(promptId) {
  while (true) {
    const res = await fetch(`${COMFYUI_URL}/history/${promptId}`);
    const data = await res.json();
    if (data[promptId] && data[promptId].status) {
      if (data[promptId].status.completed) return data[promptId];
      if (data[promptId].status.status_str === "error")
        throw new Error(`Generation failed for ${promptId}`);
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
}

async function main() {
  console.log(`Starting batch generation: ${jobs.length} scenes + ${elonJobs.length} Elon portraits`);
  console.log("=".repeat(60));

  // Queue all scene jobs (no LoRA)
  for (const job of jobs) {
    const promptData = makePrompt(job.prompt, job.seed, job.w || 1344, job.h || 768, job.name);
    try {
      const result = await queuePrompt(promptData);
      console.log(`[QUEUED] ${job.name} (seed: ${job.seed}) → ${result.prompt_id}`);
    } catch (e) {
      console.error(`[ERROR] ${job.name}: ${e.message}`);
    }
  }

  // Queue all Elon LoRA jobs
  for (const job of elonJobs) {
    const promptData = makePromptWithLora(
      job.prompt,
      job.seed,
      job.w || 768,
      job.h || 1024,
      job.name
    );
    try {
      const result = await queuePrompt(promptData);
      console.log(`[QUEUED+LORA] ${job.name} (seed: ${job.seed}) → ${result.prompt_id}`);
    } catch (e) {
      console.error(`[ERROR] ${job.name}: ${e.message}`);
    }
  }

  console.log("=".repeat(60));
  console.log(`Total: ${jobs.length + elonJobs.length} images queued.`);
  console.log("Monitor progress at http://127.0.0.1:8188");
}

main().catch(console.error);
