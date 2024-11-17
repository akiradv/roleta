let messages = [];
let wheel;

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    notification.appendChild(progressBar);

    notification.onclick = () => {
        notification.style.transform = 'translateY(-100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    };

    document.getElementById('notificationsContainer').appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function addMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message) {
        if (messages.includes(message)) {
            showNotification('Mensagem já existe!', 'error');
        } else {
            messages.push(message);
            messageInput.value = '';
            showNotification('Mensagem adicionada!', 'success');
            updateWheel();
        }
    } else {
        showNotification('Por favor, insira uma mensagem.', 'error');
    }
}

function updateWheel() {
    const segments = messages.map((message, index) => ({
        fillStyle: ['#e74c3c', '#2ecc71', '#3498db'][index % 3],
        text: message
    }));

    wheel = new Winwheel({
        canvasId: 'canvas',
        numSegments: segments.length,
        segments: segments,
        animation: {
            type: 'spinToStop',
            duration: 5,
            spins: 8,
            callbackFinished: displayResult
        }
    });
}

function spin() {
    if (messages.length < 2) {
        showNotification('É necessário pelo menos 2 mensagens para girar a roleta.', 'error');
        return;
    }

    wheel.startAnimation();
}

function displayResult(indicatedSegment) {
    document.getElementById('resultText').innerText = indicatedSegment.text;
    document.getElementById('resultDisplay').style.display = 'block';
    showNotification('Roleta girada!', 'success');
    showConfetti();
    document.getElementById('removeResultBtn').style.display = 'block';
}

function showConfetti() {
    const confettiCount = 100;
    const container = document.body;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.bottom = '0';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        container.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}

function removeResult() {
    const result = document.getElementById('resultText').innerText;
    if (result) {
        messages = messages.filter(message => message !== result);
        document.getElementById('resultText').innerText = '';
        document.getElementById('resultDisplay').style.display = 'none';
        showNotification('Resultado removido!', 'success');
        updateWheel();
        document.getElementById('removeResultBtn').style.display = 'none';
    } else {
        showNotification('Nenhum resultado para remover.', 'error');
    }
}
