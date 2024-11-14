let messages = [];

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
            updateRoulette();
        }
    } else {
        showNotification('Por favor, insira uma mensagem.', 'error');
    }
}

function updateRoulette() {
    const roulette = document.getElementById('roulette');
    roulette.innerHTML = ''; // Limpa as fatias existentes
    const angleStep = 360 / messages.length;

    messages.forEach((message, index) => {
        const slice = document.createElement('div');
        slice.className = 'slice';
        slice.style.transform = `rotate(${index * angleStep}deg) translateY(-50%)`;
        slice.textContent = message;
        roulette.appendChild(slice);
    });
}

function spin() {
    if (messages.length < 2) {
        showNotification('É necessário pelo menos 2 mensagens para girar a roleta.', 'error');
        return;
    }

    const roulette = document.getElementById('roulette');
    const randomDegree = Math.floor(Math.random() * 360) + 360 * 3; // Gira pelo menos 3 voltas completas
    roulette.style.transition = 'transform 2s ease-out';
    roulette.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        const result = messages[randomIndex];
        document.getElementById('resultText').innerText = result;
        document.getElementById('resultDisplay').style.display = 'block';
        showNotification('Roleta girada!', 'success');
        showConfetti();
        document.getElementById('removeResultBtn').style.display = 'block'; // Mostra o botão de remover resultado
    }, 2000);
}

function showConfetti() {
    const confettiCount = 100;
    const container = document.body;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
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
        updateRoulette();
        document.getElementById('removeResultBtn').style.display = 'none'; // Esconde o botão após remover
    } else {
        showNotification('Nenhum resultado para remover.', 'error');
    }
}
