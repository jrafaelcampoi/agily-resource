function receptData() {
    var result5;
    var btn5;
    var input5;
    var promptInput5;  

    const OPENAI_API_KEY = "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";

    result5 = document.getElementById('result-textbox5')
    btn5 = document.getElementById('btn5')
    input5 = document.getElementById('input-data').value.toLowerCase()
    btn5.disabled = true;
    promptInput5 = input5;

    result5.style.userSelect = 'auto';
    result5.style.cursor = 'text';
    result5.style.fontWeight = '400';
    result5.value = "Isso pode demorar um pouco...";

    fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: "Me dê um dado, sobre "+promptInput5+", citando uma fonte confiável",
      max_tokens: 2048,
      temperature: 1,
    }),
  }).then((response) => response.json()).then((json) => {
    
    if (result5.value) result5.value;

      if (json.error?.message) {
        result5.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text;

        result5.style.fontWeight = '700';
        result5.value = "Aqui está um dado solicitado sobre "+promptInput5 + text;
    }

  }).catch((error) => console.error("Error:", error))
  .finally(() => {
    btn5.disabled = false;
  });
}