function getText() {
    var result3;
    var btn3;
    var input3;
    var promptInput3;  
    var aspect3text;
    var aspect3;

    const OPENAI_API_KEY = "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";

    result3 = document.getElementById('result-textbox3')
    btn3 = document.getElementById('btn3')
    input3 = document.getElementById('input-text').value.toLowerCase()
    btn3.disabled = true;
    promptInput3 = input3;

    aspect3 = document.getElementById('aspect-text').value

    switch (aspect3) {
        case 'i1':
            aspect3text = 'informativo'; break;
        case 'd2':
            aspect3text = 'descritivo'; break;
        case 'p3':
            aspect3text = 'persuasivo'; break;
        case 'j4':
            aspect3text = 'jornalístico'; break;
    }

    result3.style.userSelect = 'auto';
    result3.style.cursor = 'text';
    result3.style.fontWeight = '400';
    result3.value = "Isso pode demorar um pouco... (Textos demoram para ser processados)";

    fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: "Crie um texto sobre "+promptInput3+", com teor altamente "+aspect3text+".",
      max_tokens: 2048,
      temperature: 1,
    }),
  }).then((response) => response.json()).then((json) => {
    
    if (result3.value) result3.value;

      if (json.error?.message) {
        result3.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text;

        result3.style.fontWeight = '700';
        result3.value = "Aqui está um texto sobre "+promptInput3 + text;
    }

  }).catch((error) => console.error("Error:", error))
  .finally(() => {
    btn3.disabled = false;
  });
}