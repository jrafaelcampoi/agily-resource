function getIdeas() {
    var result2;
    var btn2;
    var input2;
    var promptInput2;  

    const OPENAI_API_KEY = "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";

    result2 = document.getElementById('result-textbox2')
    btn2 = document.getElementById('btn2')
    input2 = document.getElementById('input-ideia').value.toLowerCase()
    btn2.disabled = true;
    promptInput2 = input2;

    result2.style.userSelect = 'auto';
    result2.style.cursor = 'text';
    result2.style.fontWeight = '400';
    result2.value = "Isso pode demorar um pouco...";

    fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: "Me liste 5 ideias de posts sobre "+promptInput2+".",
      max_tokens: 2048,
      temperature: 1,
    }),
  }).then((response) => response.json()).then((json) => {
    
    if (result2.value) result2.value;

      if (json.error?.message) {
        result2.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text;

        result2.style.fontWeight = '700'
        result2.value = "Aqui está 5 ideias de posts para criar conteúdo sobre "+promptInput2 + text;
    }

  }).catch((error) => console.error("Error:", error))
  .finally(() => {
    btn2.disabled = false;
  });
}