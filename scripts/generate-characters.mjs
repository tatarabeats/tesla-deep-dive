// Generate Sam Altman & Jensen Huang portraits via ComfyUI API

const COMFYUI_URL = "http://127.0.0.1:8188";

function makePrompt(text, seed, width = 768, height = 1024, prefix = "char") {
  return {
    prompt: {
      "1": { class_type: "UnetLoaderGGUF", inputs: { unet_name: "flux-2-klein-9b-Q5_K_M.gguf" } },
      "2": { class_type: "CLIPLoader", inputs: { clip_name: "qwen_3_8b_fp8mixed.safetensors", type: "flux2" } },
      "3": { class_type: "VAELoader", inputs: { vae_name: "flux2-vae.safetensors" } },
      "4": { class_type: "CLIPTextEncode", inputs: { text, clip: ["2", 0] } },
      "5": { class_type: "EmptyLatentImage", inputs: { width, height, batch_size: 1 } },
      "6": { class_type: "KSampler", inputs: { model: ["1", 0], positive: ["4", 0], negative: ["4", 0], latent_image: ["5", 0], seed, control_after_generate: "fixed", steps: 4, cfg: 1.0, sampler_name: "euler", scheduler: "simple", denoise: 1.0 } },
      "7": { class_type: "VAEDecode", inputs: { samples: ["6", 0], vae: ["3", 0] } },
      "8": { class_type: "SaveImage", inputs: { images: ["7", 0], filename_prefix: prefix } },
    },
  };
}

const jobs = [
  // --- SAM ALTMAN ---
  {
    name: "sam-altman-portrait",
    prompt: "A portrait of Sam Altman, CEO of OpenAI, young American tech executive in his late 30s, short light brown hair neatly combed, clean shaven, wearing a simple grey crew neck t-shirt, calm confident expression, soft smile, Silicon Valley office background blurred, natural lighting, photorealistic, 4k, high detail portrait photography",
    seed: 1985,
    w: 768, h: 1024,
  },
  {
    name: "sam-altman-boardroom",
    prompt: "A young American tech CEO sitting at the head of a modern boardroom table, short light brown hair, wearing a simple grey t-shirt, hands folded, intense focused gaze, glass walls with city view behind, dramatic side lighting, corporate power portrait, photorealistic, cinematic",
    seed: 2023,
    w: 1344, h: 768,
  },
  {
    name: "sam-altman-fired",
    prompt: "A young American tech CEO walking alone through a modern glass office building hallway, looking stunned and shocked, short light brown hair, wearing a grey t-shirt, empty hallway, dramatic lighting casting long shadows, emotional moment, photorealistic, cinematic, moody atmosphere",
    seed: 1117,
    w: 1344, h: 768,
  },
  {
    name: "sam-altman-stage",
    prompt: "A young American tech CEO on stage at a tech conference, short light brown hair, wearing a simple dark shirt, presenting with a large screen behind showing AI neural network graphics, blue and purple stage lighting, audience silhouettes visible, photorealistic, wide shot, cinematic",
    seed: 2222,
    w: 1344, h: 768,
  },

  // --- JENSEN HUANG ---
  {
    name: "jensen-huang-portrait",
    prompt: "A portrait of Jensen Huang, CEO of NVIDIA, middle-aged Asian American man with short grey-black hair, wearing his signature black leather jacket over a black t-shirt, confident charismatic smile, dramatic lighting, dark background with subtle green GPU-like glow, photorealistic, 4k, high detail portrait photography",
    seed: 1963,
    w: 768, h: 1024,
  },
  {
    name: "jensen-huang-keynote",
    prompt: "A middle-aged Asian American tech CEO on stage at a massive tech keynote, wearing a black leather jacket, holding up a large GPU chip triumphantly, giant LED screens behind showing NVIDIA graphics, green and black lighting theme, massive audience, photorealistic, cinematic wide shot, dramatic lighting",
    seed: 2024,
    w: 1344, h: 768,
  },
  {
    name: "jensen-huang-gpu-glow",
    prompt: "A middle-aged Asian American man in a black leather jacket standing in a dark server room, holding a glowing GPU chip that illuminates his face with green light, rows of servers behind him, dramatic chiaroscuro lighting, powerful commanding presence, photorealistic, cinematic",
    seed: 4090,
    w: 1344, h: 768,
  },
];

async function main() {
  console.log(`Queuing ${jobs.length} character images...`);
  for (const job of jobs) {
    const data = makePrompt(job.prompt, job.seed, job.w, job.h, job.name);
    try {
      const res = await fetch(`${COMFYUI_URL}/prompt`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await res.json();
      console.log(`[QUEUED] ${job.name} (${job.w}x${job.h}) → ${result.prompt_id}`);
    } catch (e) {
      console.error(`[ERROR] ${job.name}: ${e.message}`);
    }
  }
  console.log("Done queuing. Monitor at http://127.0.0.1:8188");
}

main().catch(console.error);
