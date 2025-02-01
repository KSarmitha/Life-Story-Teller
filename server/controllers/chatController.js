const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs").promises;
const Story = require("../models/Story");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function fileToGenerativePart(file) {
  const mimeType = file.mimetype;
  const bytes = await fs.readFile(file.path);
  return {
    inlineData: {
      data: Buffer.from(bytes).toString("base64"),
      mimeType,
    },
  };
}

const processDocument = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imagePart = await fileToGenerativePart(file);
    const result = await model.generateContent([
      "Extract and summarize the key information from this document:",
      imagePart,
    ]);

    const response = await result.response;
    const extractedContent = response.text();

    await fs.unlink(file.path);

    res.json({ extractedContent });
  } catch (error) {
    res.status(500).json({
      message: "Error processing document",
      error: error.message,
    });
  }
};

const generateResponse = async (req, res) => {
  try {
    const { question, context, fileId } = req.body;

    const modelName = fileId ? "gemini-1.5-flash" : "gemini-1.5-pro";
    const model = genAI.getGenerativeModel({ model: modelName });

    let prompt;
    if (fileId) {
      const story = await Story.findOne({ "content.fileId": fileId });
      if (story && story.content.extractedContent) {
        prompt = `
          Context from document: ${story.content.extractedContent}
          
          Question: ${question}
          
          Please provide a detailed answer based on the document context.
        `;
      }
    } else {
      prompt = `
          Context from document: ${context}
          
          Question: ${question}
          
          Please provide a detailed answer based on the document context.
        `;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    res.json({ answer });
  } catch (error) {
    res.status(500).json({
      message: "Error generating response",
      error: error.message,
    });
  }
};

const generateStoryFromData = async (req, res) => {
  try {
    const { userId } = req.params;
    const stories = await Story.find({ userId }).sort({ date: -1 });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const storiesContext = stories.map((story) => story.content).join("\n\n");
    
    const prompt = `
        Based on the following interactions, create a coherent narrative about the user:
        ${storiesContext}
        
        Please create a story that connects these interactions in a meaningful way.
      `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedStory = response.text();

    res.json({ generatedStory });
  } catch (error) {
    res.status(500).json({
      message: "Error generating story",
      error: error.message,
    });
  }
};

module.exports = {
  generateResponse,
  processDocument,
  generateStoryFromData,
};
