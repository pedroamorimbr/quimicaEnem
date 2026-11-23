// Mantém o histórico local do chat e controla envio, cópia e navegação responsiva.
document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('#leonardiaChat');
    const chat = document.querySelector('#waChat');
    const form = document.querySelector('#waComposer');
    const textarea = document.querySelector('#pergunta');
    const sendButton = document.querySelector('#sendButton');
    const conversationField = document.querySelector('#conversationId');
    const historyList = document.querySelector('#chatHistory');
    const historyNote = document.querySelector('.history-note');
    const layout = document.querySelector('#leonardiaLayout');
    const sidebarToggle = document.querySelector('#sidebarToggle');
    const sidebarBackdrop = document.querySelector('#chatSidebarBackdrop');
    const clearHistoryButton = document.querySelector('#clearHistoryButton');
    const readonlyNote = document.querySelector('#historyReadonlyNote');
    const thinkingMessage = document.querySelector('#thinkingMessage');
    const composerStatus = document.querySelector('#composerStatus');

    if (!app || !chat || !form || !textarea || !sendButton) return;

    // O histórico fica neste navegador; a resposta da IA é obtida pelo servidor PHP.
    const historyKey = 'leonardia:history:v1';
    const activeConversationKey = 'leonardia:active:v1';
    const params = new URLSearchParams(window.location.search);
    const serverResponse = app.dataset.hasResponse === 'true';
    let isReadOnly = false;

    const announce = (message) => {
        if (composerStatus) composerStatus.textContent = message;
    };

    const reportStorageIssue = (message) => {
        if (historyNote) historyNote.textContent = message;
        announce(message);
    };

    const getHistory = () => {
        try {
            const raw = window.localStorage.getItem(historyKey);
            if (!raw) return [];

            const history = JSON.parse(raw);
            if (!Array.isArray(history)) throw new Error('Invalid conversation history');

            return history.filter((conversation) =>
                conversation
                && typeof conversation.id === 'string'
                && typeof conversation.title === 'string'
                && Array.isArray(conversation.messages)
            );
        } catch (error) {
            reportStorageIssue('O histórico não pôde ser carregado neste navegador.');
            return [];
        }
    };

    const saveHistory = (history) => {
        try {
            window.localStorage.setItem(historyKey, JSON.stringify(history.slice(0, 20)));
            return true;
        } catch (error) {
            reportStorageIssue('Não foi possível salvar o histórico neste navegador.');
            return false;
        }
    };

    const setActiveConversation = (id) => {
        try {
            window.sessionStorage.setItem(activeConversationKey, id);
        } catch (error) {
            reportStorageIssue('Não foi possível manter a conversa ativa durante a navegação.');
        }
    };

    const getActiveConversation = () => {
        try {
            return window.sessionStorage.getItem(activeConversationKey) || '';
        } catch (error) {
            reportStorageIssue('Não foi possível recuperar a conversa ativa.');
            return '';
        }
    };

    const makeConversationId = () => {
        if (window.crypto && typeof window.crypto.randomUUID === 'function') {
            return window.crypto.randomUUID();
        }
        return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    };

    const truncateTitle = (text) => {
        const title = text.replace(/\s+/g, ' ').trim();
        return title.length > 58 ? `${title.slice(0, 55)}...` : title;
    };

    const renderHistoryList = (currentId) => {
        const history = getHistory();
        if (!historyList) return;

        historyList.replaceChildren();
        if (!history.length) {
            const empty = document.createElement('p');
            empty.className = 'history-empty';
            empty.textContent = 'Suas conversas recentes aparecerão aqui.';
            historyList.append(empty);
            return;
        }

        history.sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0));
        history.forEach((conversation) => {
            const link = document.createElement('a');
            link.className = 'history-item';
            link.href = `leonardia.php?conversation_id=${encodeURIComponent(conversation.id)}`;
            link.textContent = conversation.title || 'Conversa de Química';
            if (conversation.id === currentId) link.setAttribute('aria-current', 'page');
            historyList.append(link);
        });
    };

    const addArchivedMessage = (message) => {
        const article = document.createElement('article');
        article.className = `message ${message.role === 'user' ? 'outbound' : 'inbound'}`;
        article.dataset.role = message.role === 'user' ? 'user' : 'assistant';

        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = String(message.text || '');
        article.append(bubble);

        if (message.role !== 'user') {
            const copyButton = document.createElement('button');
            copyButton.className = 'message-copy';
            copyButton.type = 'button';
            copyButton.textContent = 'Copiar';
            copyButton.setAttribute('aria-label', 'Copiar resposta');
            article.append(copyButton);
        }

        chat.append(article);
    };

    const showArchivedConversation = (conversation) => {
        chat.replaceChildren();
        conversation.messages.forEach(addArchivedMessage);
        isReadOnly = true;
        textarea.disabled = true;
        textarea.placeholder = 'Histórico somente para consulta';
        sendButton.disabled = true;
        if (readonlyNote) readonlyNote.hidden = false;
        app.dataset.conversationId = conversation.id;
        renderHistoryList(conversation.id);
        chat.scrollTop = chat.scrollHeight;
    };

    const getMessageText = (message) => message.dataset.messageText || '';

    // Incorpora ao histórico local a conversa renderizada pelo servidor após o envio.
    const storeServerResponse = () => {
        const id = app.dataset.conversationId || conversationField.value || makeConversationId();
        const incoming = Array.from(chat.querySelectorAll('.message[data-role]'))
            .filter((message) => message.dataset.initialGreeting !== 'true')
            .map((message) => ({
                role: message.dataset.role === 'user' ? 'user' : 'assistant',
                text: getMessageText(message)
            }))
            .filter((message) => message.text.trim() !== '');

        if (!incoming.some((message) => message.role === 'user')) return;

        const history = getHistory();
        let conversation = history.find((item) => item.id === id);
        const previousMessages = conversation ? conversation.messages.slice() : [];

        if (!conversation) {
            const firstQuestion = incoming.find((message) => message.role === 'user');
            conversation = {
                id,
                title: truncateTitle(firstQuestion ? firstQuestion.text : 'Conversa de Química'),
                updatedAt: Date.now(),
                messages: []
            };
            history.unshift(conversation);
        }

        conversation.messages = previousMessages.concat(incoming).slice(-100);
        conversation.updatedAt = Date.now();
        conversation.title = conversation.title || truncateTitle(incoming[0].text);

        saveHistory(history);
        setActiveConversation(id);
        app.dataset.conversationId = id;
        renderHistoryList(id);

        if (previousMessages.length) {
            const greeting = chat.querySelector('.greeting-message');
            previousMessages.forEach((message) => {
                const archivedMessage = document.createElement('article');
                archivedMessage.className = `message ${message.role === 'user' ? 'outbound' : 'inbound'}`;
                archivedMessage.dataset.role = message.role;
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                bubble.textContent = String(message.text || '');
                archivedMessage.append(bubble);
                if (message.role !== 'user') {
                    const copyButton = document.createElement('button');
                    copyButton.className = 'message-copy';
                    copyButton.type = 'button';
                    copyButton.textContent = 'Copiar';
                    copyButton.setAttribute('aria-label', 'Copiar resposta');
                    archivedMessage.append(copyButton);
                }
                chat.insertBefore(archivedMessage, greeting || chat.firstChild);
            });
            if (greeting) greeting.remove();
        }
    };

    const resizeTextarea = () => {
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
        sendButton.disabled = isReadOnly || textarea.value.trim() === '';
    };

    const closeSidebar = () => {
        if (!layout || !sidebarToggle) return;
        layout.classList.remove('sidebar-open');
        sidebarToggle.setAttribute('aria-expanded', 'false');
        sidebarToggle.setAttribute('aria-label', 'Abrir histórico');
    };

    if (clearHistoryButton) {
        clearHistoryButton.addEventListener('click', () => {
            if (!window.confirm('Deseja excluir todo o histórico de pesquisa da LeonardIA?')) return;

            try {
                window.localStorage.removeItem(historyKey);
                window.sessionStorage.removeItem(activeConversationKey);
                renderHistoryList('');
                if (historyNote) historyNote.textContent = 'O histórico foi excluído deste navegador.';
                window.location.href = 'leonardia.php?new=1';
            } catch (error) {
                reportStorageIssue('Não foi possível apagar o histórico deste navegador.');
            }
        });
    }

    // Reabre uma conversa em modo somente leitura ou inicia uma conversa nova.
    if (params.get('new') === '1') {
        try {
            window.sessionStorage.removeItem(activeConversationKey);
        } catch (error) {
            reportStorageIssue('Não foi possível limpar a conversa ativa.');
        }
        app.dataset.conversationId = '';
        conversationField.value = '';
    }

    if (serverResponse) {
        storeServerResponse();
    } else {
        const requestedId = params.get('conversation_id') || (
            params.get('new') === '1' ? '' : getActiveConversation()
        );
        if (requestedId) {
            const conversation = getHistory().find((item) => item.id === requestedId);
            if (conversation) showArchivedConversation(conversation);
        }
        renderHistoryList(requestedId);
    }

    // Evita envios vazios e mostra o estado de carregamento enquanto o servidor responde.
    if (form) {
        form.addEventListener('submit', (event) => {
            if (isReadOnly || textarea.value.trim() === '') {
                event.preventDefault();
                return;
            }

            const id = app.dataset.conversationId || conversationField.value || makeConversationId();
            app.dataset.conversationId = id;
            conversationField.value = id;
            sendButton.disabled = true;
            sendButton.classList.add('is-loading');
            sendButton.setAttribute('aria-label', 'Enviando mensagem');
            app.setAttribute('aria-busy', 'true');
            if (thinkingMessage) thinkingMessage.hidden = false;
            announce('LeonardIA está pensando...');
            chat.scrollTop = chat.scrollHeight;
        });
    }

    textarea.addEventListener('input', resizeTextarea);
    textarea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
            event.preventDefault();
            if (!sendButton.disabled && typeof form.requestSubmit === 'function') {
                form.requestSubmit(sendButton);
            }
        }
    });

    document.querySelectorAll('.suggestion-card[data-prompt]').forEach((button) => {
        button.addEventListener('click', () => {
            textarea.value = button.dataset.prompt || '';
            resizeTextarea();
            textarea.focus();
            if (!sendButton.disabled && typeof form.requestSubmit === 'function') {
                form.requestSubmit(sendButton);
            }
        });
    });

    // Copia a resposta com a API moderna e usa uma alternativa para navegadores antigos.
    chat.addEventListener('click', async (event) => {
        const copyButton = event.target.closest('.message-copy');
        if (!copyButton) return;

        const bubble = copyButton.parentElement.querySelector('.bubble');
        if (!bubble) return;

        const text = bubble.innerText;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                const temporaryInput = document.createElement('textarea');
                temporaryInput.value = text;
                temporaryInput.setAttribute('readonly', '');
                temporaryInput.style.position = 'fixed';
                temporaryInput.style.opacity = '0';
                document.body.append(temporaryInput);
                temporaryInput.select();
                const copied = document.execCommand('copy');
                temporaryInput.remove();
                if (!copied) throw new Error('Copy command failed');
            }

            copyButton.textContent = 'Copiado';
            announce('Resposta copiada.');
            window.setTimeout(() => {
                copyButton.textContent = 'Copiar';
            }, 1400);
        } catch (error) {
            announce('Não foi possível copiar a resposta neste navegador.');
        }
    });

    if (sidebarToggle && layout) {
        sidebarToggle.addEventListener('click', () => {
            if (window.matchMedia('(max-width: 860px)').matches) {
                const open = layout.classList.toggle('sidebar-open');
                sidebarToggle.setAttribute('aria-expanded', String(open));
                sidebarToggle.setAttribute('aria-label', open ? 'Fechar histórico' : 'Abrir histórico');
            } else {
                layout.classList.toggle('sidebar-collapsed');
            }
        });
    }

    if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeSidebar();
    });

    document.querySelectorAll('#newChatLink, .wa-clear-chat').forEach((link) => {
        link.addEventListener('click', () => {
            try {
                window.sessionStorage.removeItem(activeConversationKey);
            } catch (error) {
                reportStorageIssue('Não foi possível limpar a conversa ativa.');
            }
        });
    });

    const updateViewportHeight = () => {
        if (window.visualViewport && window.matchMedia('(max-width: 640px)').matches) {
            const viewportHeight = Math.min(window.visualViewport.height, window.innerHeight);
            layout.style.setProperty('--chat-viewport-height', `${viewportHeight}px`);
        } else {
            layout.style.removeProperty('--chat-viewport-height');
        }
    };

    if (layout && window.visualViewport) {
        updateViewportHeight();
        window.visualViewport.addEventListener('resize', updateViewportHeight);
        window.addEventListener('resize', updateViewportHeight);
    }

    if (!isReadOnly) resizeTextarea();
    if (serverResponse || isReadOnly) chat.scrollTop = chat.scrollHeight;
});
