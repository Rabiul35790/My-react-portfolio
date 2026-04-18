export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  category: string;
  coverImage: string;
  content: BlogContentBlock[];
};

export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "separator" }
  | { type: "code"; language: string; code: string }
  | { type: "link"; label: string; href: string };

export const blogPosts: BlogPost[] = [
  {
    slug: "building-a-self-hosted-background-removal-api",
    title: "Building a Self-Hosted Background Removal API - What I Learned the Hard Way",
    excerpt:
      "How I moved from paid image APIs to a self-hosted rembg + FastAPI service, handled deployment failures, and integrated it with Laravel.",
    publishedAt: "2026-04-12",
    readTime: "5 min read",
    category: "Backend Engineering",
    coverImage: "/images/blog.png",
    content: [
      {
        type: "paragraph",
        text: "Recently I worked on a background removing tool and it turned out to be way more than just integrating an API. This is the full technical breakdown of how I got there."
      },
      { type: "separator" },
      { type: "heading", text: "Starting With the Obvious Options" },
      {
        type: "paragraph",
        text: "My first stop was the popular services - remove.bg, Clipdrop, Photoroom. Good quality, straightforward integration, and solid API documentation. But all of them charge per image after free limits. For something meant to handle real traffic, that pricing model does not scale well."
      },
      { type: "paragraph", text: "So I needed a different approach." },
      { type: "separator" },
      { type: "heading", text: "Finding rembg" },
      {
        type: "paragraph",
        text: "I found rembg on GitHub, an open-source Python library using U2-Net locally. Same quality class, no API key, no billing, no rate limits. Exactly what I wanted."
      },
      {
        type: "paragraph",
        text: "I had to wrap it into a proper API first. FastAPI made that part straightforward. The key optimization was preloading the model at startup rather than per request."
      },
      {
        type: "code",
        language: "python",
        code: "from fastapi import FastAPI, File, UploadFile\nfrom fastapi.responses import Response, JSONResponse\nfrom rembg import new_session, remove\n\napp = FastAPI()\nsession = None\n\n@app.on_event(\"startup\")\ndef load_model():\n    global session\n    session = new_session(\"u2net\")\n\n@app.get(\"/\")\ndef health():\n    return {\"status\": \"ok\"}\n\n@app.post(\"/remove-bg\")\nasync def remove_background(file: UploadFile = File(...)):\n    try:\n        contents = await file.read()\n        result = remove(contents, session=session)\n        return Response(content=result, media_type=\"image/png\")\n    except Exception as e:\n        return JSONResponse(status_code=500, content={\"error\": str(e)})"
      },
      { type: "separator" },
      { type: "heading", text: "Render.com - Close, But Not Quite" },
      {
        type: "paragraph",
        text: "I tried Render first because deployment is simple. Initial build failed due to missing ONNX backend, fixed by switching to rembg[cpu]. Then deployment failed at runtime with memory pressure when loading U2-Net."
      },
      {
        type: "code",
        language: "text",
        code: "==> Out of memory (used over 512Mi)\n==> Exited with status 1"
      },
      {
        type: "paragraph",
        text: "The free tier memory ceiling was the blocker, not app logic. The model required more headroom before processing a single image."
      },
      { type: "separator" },
      { type: "heading", text: "Moving to a VPS" },
      {
        type: "paragraph",
        text: "The stable solution was a KVM VPS with isolated Python service setup. FastAPI runs on a dedicated port and Nginx proxies public traffic to it."
      },
      {
        type: "code",
        language: "bash",
        code: "# start.sh\n#!/bin/bash\ncd /home/your-user/htdocs/rembg.yourdomain.com\nsource venv/bin/activate\nuvicorn main:app --host 0.0.0.0 --port 8090\n\n# Run it\nnohup ./start.sh > app.log 2>&1 &\n\n# Auto-restart on reboot\ncrontab -e\n@reboot /home/your-user/htdocs/rembg.yourdomain.com/start.sh >> app.log 2>&1 &"
      },
      { type: "separator" },
      { type: "heading", text: "Integrating Into Laravel" },
      {
        type: "paragraph",
        text: "With the API running, Laravel integration was straightforward: validate upload, forward multipart request, and stream PNG response back."
      },
      {
        type: "code",
        language: "php",
        code: "public function removeBackground(Request $request)\n{\n    $request->validate(['image' => 'required|image|max:10240']);\n\n    $image = $request->file('image');\n\n    $response = Http::timeout(60)\n        ->attach('file', file_get_contents($image->getRealPath()), $image->getClientOriginalName())\n        ->post(env('REMBG_API_URL') . '/remove-bg');\n\n    if ($response->successful()) {\n        return response($response->body())->header('Content-Type', 'image/png');\n    }\n\n    return response()->json(['error' => 'Processing failed'], 500);\n}"
      },
      { type: "code", language: "dotenv", code: "REMBG_API_URL=https://rembg.yourdomain.com" },
      { type: "separator" },
      { type: "heading", text: "The Result" },
      {
        type: "paragraph",
        text: "The hardest part was infrastructure, not coding. The final result is a self-hosted background removal API with no per-image cost and no third-party dependency."
      },
      {
        type: "paragraph",
        text: "U2-Net performs well on most people and product images, while very fine edge detail can still be imperfect. If you plan this route, confirm RAM headroom before committing. If self-hosting is not possible, a paid Render plan with higher memory is the practical fallback."
      },
      { type: "separator" },
      { type: "heading", text: "Live Tool" },
      {
        type: "link",
        label: "Try the Background Remover",
        href: "https://devtoolvault.com/tools/background-remover"
      }
    ]
  }
];
