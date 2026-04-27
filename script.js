const textInput = document.getElementById("textInput");
const copyButton = document.getElementById("copyButton");
const clearButton = document.getElementById("clearButton");
const copyStatus = document.getElementById("copyStatus");

const counters = {
  chars: document.getElementById("charCount"),
  charsNoSpace: document.getElementById("charNoSpaceCount"),
  lines: document.getElementById("lineCount"),
  words: document.getElementById("wordCount")
};

let statusTimer;

function getStats(text) {
  const normalizedText = text.replace(/\r\n/g, "\n");
  const trimmedText = normalizedText.trim();

  return {
    chars: Array.from(normalizedText).length,
    charsNoSpace: Array.from(normalizedText.replace(/\s/g, "")).length,
    lines: normalizedText.length === 0 ? 0 : normalizedText.split("\n").length,
    words: trimmedText.length === 0 ? 0 : trimmedText.split(/\s+/).length
  };
}

function updateStats() {
  const stats = getStats(textInput.value);

  counters.chars.textContent = stats.chars.toLocaleString("ja-JP");
  counters.charsNoSpace.textContent = stats.charsNoSpace.toLocaleString("ja-JP");
  counters.lines.textContent = stats.lines.toLocaleString("ja-JP");
  counters.words.textContent = stats.words.toLocaleString("ja-JP");
}

function showStatus(message) {
  clearTimeout(statusTimer);
  copyStatus.textContent = message;
  statusTimer = setTimeout(() => {
    copyStatus.textContent = "";
  }, 1800);
}

async function copyText() {
  if (textInput.value.length === 0) {
    showStatus("入力がありません");
    textInput.focus();
    return;
  }

  try {
    await navigator.clipboard.writeText(textInput.value);
    showStatus("コピーしました");
  } catch {
    textInput.select();
    document.execCommand("copy");
    showStatus("コピーしました");
  }
}

function clearText() {
  textInput.value = "";
  updateStats();
  showStatus("クリアしました");
  textInput.focus();
}

textInput.addEventListener("input", updateStats);
copyButton.addEventListener("click", copyText);
clearButton.addEventListener("click", clearText);

updateStats();
