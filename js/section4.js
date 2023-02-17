function getHashtags() {
    var result4;
    var btn4;
    var input4;
    var promptInput4;
    
    const OPENAI_API_KEY = "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";

    result4 = document.getElementById('result-textbox4')
    btn4 = document.getElementById('btn4')
    input4 = document.getElementById('input-hashtag').value.toLowerCase()
    btn4.disabled = true;
    promptInput4 = input4;

    result4.style.userSelect = 'auto';
    result4.style.cursor = 'text';
    result4.style.fontWeight = '400';
    result4.value = "Isso pode demorar um pouco...";

    fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: "Me dê 30 hashtags em português relacionadas sobre "+promptInput4+".",
      max_tokens: 2048,
      temperature: 1,
    }),
  }).then((response) => response.json()).then((json) => {
    
    if (result4.value) result4.value;

      if (json.error?.message) {
        result4.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text;

        result4.style.fontWeight = '700'
        result4.value = "Aqui está 30 hashtags:" + text;
    }

  }).catch((error) => console.error("Error:", error))
  .finally(() => {
    btn4.disabled = false;
  });
}