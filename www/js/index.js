document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('word-form').addEventListener('submit', analyzeText);
}

function analyzeText(e) {
    e.preventDefault();
    
    const text = document.getElementById('text-input').value;
    const limit = parseInt(document.getElementById('limit').value);
    const listAll = document.getElementById('list-all').checked;
    const useStemming = document.getElementById('use-stemming').checked;
    const filterType = document.getElementById('filter-type').value;

    // Burada sunucu tarafı işlemler yerine istemci tarafında basit bir analiz yapacağız
    const words = text.toLowerCase().match(/\b(\w+)'?(\w+)?\b/g);
    const frequency = {};

    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });

    const sortedWords = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    const topWords = listAll ? sortedWords : sortedWords.slice(0, limit);

    displayResult(topWords);
}

function displayResult(words) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h2>Sonuçlar:</h2>';

    const table = document.createElement('table');
    table.innerHTML = '<tr><th>Kelime</th><th>Frekans</th></tr>';

    words.forEach(([word, count]) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = word;
        row.insertCell(1).textContent = count;
    });

    resultDiv.appendChild(table);
}
