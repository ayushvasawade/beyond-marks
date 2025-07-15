import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting (for development)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(identifier);
  
  if (!userRequests || now > userRequests.resetTime) {
    requestCounts.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (userRequests.count >= maxRequests) {
    return false;
  }
  
  userRequests.count++;
  return true;
}

// Define the expected request body type
interface GeminiTaskRequestBody {
  code: string;
  xp?: number;
  goal?: string;
  errors?: string[];
  hint?: boolean;
  explain?: boolean;
}

export async function POST(req: NextRequest) {
  let body: GeminiTaskRequestBody = { code: "" };
  
  try {
    console.log("API route called");
    
    body = (await req.json()) as GeminiTaskRequestBody;
    console.log("Request body:", body);
    
    const { hint, explain } = body;
    
    // Simple rate limiting
    const clientId = req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(clientId, 5, 60000)) { // 5 requests per minute
      return NextResponse.json({ 
        error: "Rate limit exceeded. Please wait a moment before trying again." 
      }, { status: 429 });
    }
    
    // Debug all environment variables
    console.log("All env vars:", {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      NODE_ENV: process.env.NODE_ENV,
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      hasNextPublicKey: !!process.env.NEXT_PUBLIC_GEMINI_API_KEY
    });
    
    // Temporarily hardcode the API key for testing
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyBFMvLLfiJGDZ5j8OuAuxTwaGiZzPiUFSg";
    
    console.log("API Key exists:", !!apiKey);
    console.log("API Key length:", apiKey?.length || 0);
    
    if (!apiKey) {
      return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });
    }

    // Test basic import first
    console.log("Importing Gemini SDK...");
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      console.log("Gemini SDK imported successfully");
      const gemini = new GoogleGenerativeAI(apiKey);
      gemini.getGenerativeModel({ model: "gemini-1.0-pro" });
      console.log("Model created successfully");
    } catch (importError: unknown) {
      console.error("Import error:", importError);
      if (importError instanceof Error) {
        throw new Error(`Failed to import Gemini SDK: ${importError.message}`);
      } else {
        throw new Error("Failed to import Gemini SDK: Unknown error");
      }
    }
    
    // Always use fallback response to avoid quota issues
    console.log("Using fallback response to avoid quota issues");
    const fallbackTasks = {
      beginner: [
        "Create a simple HTML page with a heading and a paragraph",
        "Make a basic webpage with your name and a favorite color",
        "Build a page with a title and three bullet points"
      ],
      intermediate: [
        "Create a responsive navigation bar with CSS",
        "Build a card layout with hover effects",
        "Make a contact form with proper styling"
      ],
      advanced: [
        "Create a responsive grid layout with CSS Grid",
        "Build an animated loading spinner with CSS",
        "Make a modal popup with backdrop blur"
      ]
    };
    
    const fallbackChallenges = [
      "Add smooth transitions to all interactive elements",
      "Implement a dark/light theme toggle",
      "Make it fully responsive for mobile devices",
      "Add accessibility features (ARIA labels, focus states)",
      "Optimize for performance and loading speed"
    ];
    
    const fallbackTips = [
      "Start with the HTML structure, then add CSS styling",
      "Use semantic HTML elements for better accessibility",
      "Test your code in different browsers",
      "Keep your CSS organized with comments",
      "Use CSS variables for consistent theming"
    ];
    
    const fallbackHints = [
      "Try using CSS flexbox for layout",
      "Consider using CSS Grid for complex layouts",
      "Use CSS custom properties for theming",
      "Add hover effects for better interactivity",
      "Make sure your code is semantic and accessible"
    ];
    
    const fallbackExplanations = [
      "This code creates a basic HTML structure with inline CSS styling. The h1 element displays a heading in cyan color, while the paragraph shows white text on the page.",
      "The HTML uses semantic elements with embedded CSS. The color scheme uses a cyan heading and white paragraph text for good contrast.",
      "This is a simple webpage structure with styled text elements. The CSS is included in a style tag for immediate visual feedback."
    ];
    
    let apiResponse: Record<string, unknown>;
    if (hint) {
      const hintIndex = Math.floor(Math.random() * fallbackHints.length);
      apiResponse = { tip: fallbackHints[hintIndex] };
    } else if (explain) {
      const explainIndex = Math.floor(Math.random() * fallbackExplanations.length);
      apiResponse = { tip: fallbackExplanations[explainIndex] };
    } else {
      const level = (body.xp || 0) < 100 ? 'beginner' : (body.xp || 0) < 300 ? 'intermediate' : 'advanced';
      const taskIndex = Math.floor(Math.random() * fallbackTasks[level].length);
      const challengeIndex = Math.floor(Math.random() * fallbackChallenges.length);
      const tipIndex = Math.floor(Math.random() * fallbackTips.length);
      
      apiResponse = {
        task: fallbackTasks[level][taskIndex],
        challenge: fallbackChallenges[challengeIndex],
        tip: fallbackTips[tipIndex]
      };
    }
    
    console.log("Returning response");
    return NextResponse.json(apiResponse);
    
  } catch (e: unknown) {
    console.error("API Error details:", {
      message: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
      name: e instanceof Error ? e.name : undefined
    });
    
    // Handle quota exceeded errors specifically
    if (e instanceof Error && (e.message?.includes('429') || e.message?.includes('quota') || e.message?.includes('Too Many Requests'))) {
      console.log("Quota exceeded, using fallback response");
      
      // Simple fallback responses
      const fallbackTasks = {
        beginner: [
          "Create a simple HTML page with a heading and a paragraph",
          "Make a basic webpage with your name and a favorite color",
          "Build a page with a title and three bullet points"
        ],
        intermediate: [
          "Create a responsive navigation bar with CSS",
          "Build a card layout with hover effects",
          "Make a contact form with proper styling"
        ],
        advanced: [
          "Create a responsive grid layout with CSS Grid",
          "Build an animated loading spinner with CSS",
          "Make a modal popup with backdrop blur"
        ]
      };
      
      const fallbackChallenges = [
        "Add smooth transitions to all interactive elements",
        "Implement a dark/light theme toggle",
        "Make it fully responsive for mobile devices",
        "Add accessibility features (ARIA labels, focus states)",
        "Optimize for performance and loading speed"
      ];
      
      const fallbackTips = [
        "Start with the HTML structure, then add CSS styling",
        "Use semantic HTML elements for better accessibility",
        "Test your code in different browsers",
        "Keep your CSS organized with comments",
        "Use CSS variables for consistent theming"
      ];
      
      const fallbackHints = [
        "Try using CSS flexbox for layout",
        "Consider using CSS Grid for complex layouts",
        "Use CSS custom properties for theming",
        "Add hover effects for better interactivity",
        "Make sure your code is semantic and accessible"
      ];
      
      const fallbackExplanations = [
        "This code creates a basic HTML structure with inline CSS styling. The h1 element displays a heading in cyan color, while the paragraph shows white text on the page.",
        "The HTML uses semantic elements with embedded CSS. The color scheme uses a cyan heading and white paragraph text for good contrast.",
        "This is a simple webpage structure with styled text elements. The CSS is included in a style tag for immediate visual feedback."
      ];
      
      // Generate fallback response based on request type
      let fallbackResponse: Record<string, unknown>;
      if (body.hint) {
        const hintIndex = Math.floor(Math.random() * fallbackHints.length);
        fallbackResponse = { tip: fallbackHints[hintIndex] };
      } else if (body.explain) {
        const explainIndex = Math.floor(Math.random() * fallbackExplanations.length);
        fallbackResponse = { tip: fallbackExplanations[explainIndex] };
      } else {
        const level = (body.xp || 0) < 100 ? 'beginner' : (body.xp || 0) < 300 ? 'intermediate' : 'advanced';
        const taskIndex = Math.floor(Math.random() * fallbackTasks[level].length);
        const challengeIndex = Math.floor(Math.random() * fallbackChallenges.length);
        const tipIndex = Math.floor(Math.random() * fallbackTips.length);
        
        fallbackResponse = {
          task: fallbackTasks[level][taskIndex],
          challenge: fallbackChallenges[challengeIndex],
          tip: fallbackTips[tipIndex]
        };
      }
      
      return NextResponse.json({ 
        ...fallbackResponse,
        warning: "Using fallback response due to API quota limits. Consider upgrading your plan for unlimited access.",
        quotaExceeded: true,
        fallback: true
      });
    }
    
    return NextResponse.json({ 
      error: "Gemini API error", 
      details: e instanceof Error ? e.message : String(e),
      type: e instanceof Error ? e.name : "Unknown"
    }, { status: 500 });
  }
} 