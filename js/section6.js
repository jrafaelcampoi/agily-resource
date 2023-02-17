function getCTA() {
    var result6;
    var btn6;
    var input6;
    var promptInput6;  

    const OPENAI_API_KEY = "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";

    result6 = document.getElementById('result-textbox6')
    btn6 = document.getElementById('btn6')
    input6 = document.getElementById('input-cta').value.toLowerCase()
    btn6.disabled = true;
    promptInput6 = input6;

    result6.style.userSelect = 'auto';
    result6.style.cursor = 'text';
    result6.style.fontWeight = '400';
    result6.value = "Isso pode demorar um pouco...";

    fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: "Crie uma CTA sobre "+promptInput6+".",
      max_tokens: 2048,
      temperature: 1,
    }),
  }).then((response) => response.json()).then((json) => {
    
    if (result6.value) result6.value;

      if (json.error?.message) {
        result6.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text;

        result6.style.fontWeight = '700';
        result6.value = "Aqui está um modelo de Call to Action sobre "+promptInput6+":" + text;
    }

  }).catch((error) => console.error("Error:", error))
  .finally(() => {
    btn6.disabled = false;
  });
}