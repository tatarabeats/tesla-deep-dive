// Generate Optimus Gen1 vs Gen2 comparison images

const COMFYUI_URL = "http://127.0.0.1:8188";

function makePrompt(text, seed, width = 1344, height = 768, prefix = "optimus") {
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
  {
    name: "optimus-gen1",
    prompt: "Tesla Optimus Gen 1 humanoid robot, bulky industrial design, exposed wires and cables, clunky mechanical joints, silver metal body, standing stiffly in a factory, prototype appearance, rough unfinished look, visible actuators, 2022 era robot, full body shot, photorealistic, studio lighting, white background",
    seed: 2022,
  },
  {
    name: "optimus-gen2",
    prompt: "Tesla Optimus Gen 2 humanoid robot, sleek refined design, smooth white and black body panels, elegant proportions, human-like hands with precise fingers picking up an egg gently, fluid natural stance, advanced actuators hidden under smooth panels, futuristic polished appearance, 2024 era next-generation robot, full body shot, photorealistic, studio lighting, white background",
    seed: 2024,
  },
  {
    name: "optimus-comparison",
    prompt: "Side by side comparison of two humanoid robots: left side shows a bulky crude prototype robot with exposed wires and clunky joints labeled GEN 1, right side shows a sleek refined elegant white robot with smooth panels and human-like hands labeled GEN 2, evolution of robotics, dramatic lighting, photorealistic, studio shot, clean white background",
    seed: 1234,
  },
  {
    name: "optimus-hands",
    prompt: "Close-up of a humanoid robot's hands delicately holding a raw egg without breaking it, precise mechanical fingers with human-like dexterity, smooth white robot hand, incredible precision engineering, shallow depth of field, photorealistic macro photography, studio lighting",
    seed: 5555,
  },
];

async function main() {
  console.log(`Queuing ${jobs.length} Optimus images...`);
  for (const job of jobs) {
    const data = makePrompt(job.prompt, job.seed, 1344, 768, job.name);
    try {
      const res = await fetch(`${COMFYUI_URL}/prompt`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await res.json();
      console.log(`[QUEUED] ${job.name} → ${result.prompt_id}`);
    } catch (e) {
      console.error(`[ERROR] ${job.name}: ${e.message}`);
    }
  }
}

main().catch(console.error);
