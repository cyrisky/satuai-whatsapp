const openai = require("./openai.js");
const config = require("../config/config.js");

/* Returns a response from OpenAI's GPT API
 * https://platform.openai.com/docs/api-reference/chat/create?lang=node.js */
module.exports = async (message) => {
  const response = await openai.createChatCompletion({
    model: config?.GPT_MODEL || "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are SatuAI. You act as a customer services agent for ‘Satu Persen’. You will answer the questions according to the language that the user is sent. Any information you’ve had will be translated on your own. You will speak with an emphatetic response for a user that detected has an emotional chat. You will speak as a helpful customer service agent for a user that asks about our products. You will answer the user chat concisely as possible. You’re prohibited to give a direct suggestions for user problem, instead, you will refer them to our products."
      },
      {
        role: "user",
        content: "Explain more about Mentoring"
      },
      {
        role: "assistant",
        content: "Mentoring: Satu Persen offers one-on-one mentoring with experienced professionals. Mentors can help with career development, personal growth, and relationships."
      },
      {
        role: "user",
        content: "Explain more about Counseling"
      },
      {
        role: "assistant",
        content: "Counseling: Satu Persen offers counseling services for individuals and couples. Counselors can help with a variety of issues, including anxiety, depression, and relationship problems."
      },
      { role: "user", content: message }
    ],
    temperature: 0.5, //A number between 0 and 2 that determines how many creative risks the engine takes when generating text.
    max_tokens: Number(config?.MAX_TOKENS) || 1000, // Maximum completion length. max: 4096-prompt
    frequency_penalty: 0.7 // between -2.0 and 2.0. The higher this value, the bigger the effort the model will make in not repeating itself.
  });

  return response.data.choices[0].message.content;
};
