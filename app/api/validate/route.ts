import { NextRequest, NextResponse } from "next/server";

interface ValidationResult {
  isValid: boolean;
  message: string;
  suggestions: string[];
  score: number; // 0-100
}

function validateHTMLStructure(code: string, _task: string): ValidationResult {
  const hasHtml = code.includes('<html') || code.includes('<!DOCTYPE');
  const hasHead = code.includes('<head');
  const hasBody = code.includes('<body');
  const hasTitle = code.includes('<title');
  
  let score = 0;
  const suggestions: string[] = [];
  
  // Basic HTML structure validation
  if (hasHtml) score += 20;
  if (hasHead) score += 20;
  if (hasBody) score += 20;
  if (hasTitle) score += 10;
  
  if (!hasHtml) suggestions.push("Add proper HTML structure with <!DOCTYPE html> and <html> tags");
  if (!hasHead) suggestions.push("Include a <head> section for metadata");
  if (!hasBody) suggestions.push("Include a <body> section for content");
  if (!hasTitle) suggestions.push("Add a <title> tag in the head section");
  
  return {
    isValid: score >= 60,
    message: score >= 60 ? "Good HTML structure!" : "HTML structure needs improvement",
    suggestions,
    score
  };
}

function validateCSSStructure(code: string, _task: string): ValidationResult {
  const hasCss = code.includes('{') && code.includes('}');
  const hasSelectors = code.includes('h1') || code.includes('h2') || code.includes('p') || code.includes('div') || code.includes('.') || code.includes('#');
  const hasProperties = code.includes('color') || code.includes('background') || code.includes('font') || code.includes('margin') || code.includes('padding');
  
  let score = 0;
  const suggestions: string[] = [];
  
  if (hasCss) score += 30;
  if (hasSelectors) score += 30;
  if (hasProperties) score += 40;
  
  if (!hasCss) suggestions.push("Add CSS rules with curly braces {}");
  if (!hasSelectors) suggestions.push("Use CSS selectors like h1, p, .class, or #id");
  if (!hasProperties) suggestions.push("Add CSS properties like color, background, font-size, etc.");
  
  return {
    isValid: score >= 60,
    message: score >= 60 ? "Good CSS structure!" : "CSS structure needs improvement",
    suggestions,
    score
  };
}

function validateTaskSpecific(code: string, task: string): ValidationResult {
  const lowerTask = task.toLowerCase();
  const lowerCode = code.toLowerCase();
  
  let score = 0;
  const suggestions: string[] = [];
  
  // Check for specific task requirements
  if (lowerTask.includes('heading') && lowerCode.includes('<h1')) {
    score += 40;
  } else if (lowerTask.includes('heading')) {
    suggestions.push("Add an <h1> heading to your HTML");
  }
  
  if (lowerTask.includes('paragraph') && lowerCode.includes('<p')) {
    score += 30;
  } else if (lowerTask.includes('paragraph')) {
    suggestions.push("Add a <p> paragraph to your HTML");
  }
  
  if (lowerTask.includes('color') && (lowerCode.includes('color:') || lowerCode.includes('background-color:'))) {
    score += 30;
  } else if (lowerTask.includes('color')) {
    suggestions.push("Add color styling to your CSS");
  }
  
  if (lowerTask.includes('responsive') && (lowerCode.includes('@media') || lowerCode.includes('flex') || lowerCode.includes('grid'))) {
    score += 40;
  } else if (lowerTask.includes('responsive')) {
    suggestions.push("Add responsive design with CSS Grid, Flexbox, or media queries");
  }
  
  if (lowerTask.includes('navigation') && (lowerCode.includes('<nav') || lowerCode.includes('nav'))) {
    score += 40;
  } else if (lowerTask.includes('navigation')) {
    suggestions.push("Add a <nav> element for navigation");
  }
  
  if (lowerTask.includes('form') && lowerCode.includes('<form')) {
    score += 40;
  } else if (lowerTask.includes('form')) {
    suggestions.push("Add a <form> element with input fields");
  }
  
  return {
    isValid: score >= 60,
    message: score >= 60 ? "Task requirements met!" : "Task requirements not fully met",
    suggestions,
    score
  };
}

function validateBestPractices(code: string): string[] {
  const suggestions: string[] = [];
  const lowerCode = code.toLowerCase();
  
  // Check for common best practices
  if (!lowerCode.includes('<!doctype')) {
    suggestions.push("Add <!DOCTYPE html> declaration for proper HTML5 structure");
  }
  
  if (!lowerCode.includes('<meta charset')) {
    suggestions.push("Add <meta charset='UTF-8'> for proper character encoding");
  }
  
  if (lowerCode.includes('style') && !lowerCode.includes('<style')) {
    suggestions.push("Use <style> tags or external CSS files instead of inline styles");
  }
  
  if (lowerCode.includes('<div') && !lowerCode.includes('class=') && !lowerCode.includes('id=')) {
    suggestions.push("Add meaningful class or id attributes to your div elements");
  }
  
  if (lowerCode.includes('color:') && !lowerCode.includes('color: #') && !lowerCode.includes('color: rgb') && !lowerCode.includes('color: hsl')) {
    suggestions.push("Use hex codes (#ffffff), rgb(), or hsl() for better color control");
  }
  
  if (lowerCode.includes('font-size') && lowerCode.includes('px') && !lowerCode.includes('rem') && !lowerCode.includes('em')) {
    suggestions.push("Consider using rem or em units for better responsive typography");
  }
  
  return suggestions;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;
    
    if (!code) {
      return NextResponse.json({ 
        error: "Missing required fields: code" 
      }, { status: 400 });
    }
    
    // Separate HTML and CSS
    const htmlMatch = code.match(/<[^>]*>/g) || [];
    const cssMatch = code.match(/\{[^}]*\}/g) || [];
    
    const hasHTML = htmlMatch.length > 0;
    const hasCSS = cssMatch.length > 0;
    
    // Perform validations
    const htmlValidation = hasHTML ? validateHTMLStructure(code, "") : { isValid: false, message: "No HTML found", suggestions: ["Add HTML structure"], score: 0 };
    const cssValidation = hasCSS ? validateCSSStructure(code, "") : { isValid: false, message: "No CSS found", suggestions: ["Add CSS styling"], score: 0 };
    const taskValidation = validateTaskSpecific(code, "");
    const bestPractices = validateBestPractices(code);
    
    // Calculate overall score
    const overallScore = Math.round((htmlValidation.score + cssValidation.score + taskValidation.score) / 3);
    const isValid = overallScore >= 70;
    
    // Combine suggestions
    const allSuggestions = [
      ...htmlValidation.suggestions,
      ...cssValidation.suggestions,
      ...taskValidation.suggestions,
      ...bestPractices
    ];
    
    // Remove duplicates
    const uniqueSuggestions = [...new Set(allSuggestions)];
    
    const result = {
      isValid,
      score: overallScore,
      message: isValid ? "Great job! Your code meets the requirements!" : "Your code needs some improvements",
      suggestions: uniqueSuggestions,
      details: {
        html: htmlValidation,
        css: cssValidation,
        task: taskValidation,
        bestPractices
      }
    };
    
    return NextResponse.json(result);
    
  } catch (error: unknown) {
    console.error("Validation error:", error);
    return NextResponse.json({ 
      error: "Failed to validate code",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 