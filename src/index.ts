async function main() {
    
  const question: string = process.argv.slice(2).join(" ");

  const payload = {
    model: "qwen3:4b",

    messages: [
      {
        role: "system",
        content: "You are a wilderness survival assistant.",
      },
      {
        role: "user",
        content: question,
      },
    ],

    stream: false,

    options: {
      temperature: 0.2,
    },
  };

  try {
    const resp: Response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      throw new Error(
        `Ollama request failed: ${resp.status} ${resp.statusText}`,
      );
    }

    const data = await resp.json();

    console.log(data.message.content);
  } catch (error) {
    console.error(error);
  }
}

main();
