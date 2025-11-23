// ========================
// SALVAR USUÁRIO NO LOCALSTORAGE
// ========================
export function salvarUsuarioLocalStorage(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
}

// ========================
// VERIFICAR SE USUÁRIO ESTÁ LOGADO
// ========================
export function verificarLogin() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    return usuario !== null;
}

// ========================
// RETORNAR TIPO DO USUÁRIO
// ========================
export function verificarTipo() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    return usuario ? usuario.tipo : null;
}

// ========================
// OBTER USUÁRIO ATUAL
// ========================
export function obterUsuarioAtual() {
    return JSON.parse(localStorage.getItem('usuario')) || null;
}

// ========================
// BUSCAR DADOS DO USUÁRIO PELO ID (MOCK)
// ========================
export async function buscarDadosUsuario(id) {
    const mockDB = [
        { id: 1, nome: 'Wilson Pereira', tipo: 'admin' },
        { id: 2, nome: 'João Silva', tipo: 'comum' }
    ];

    return new Promise((resolve) => {
        const usuario = mockDB.find(u => u.id === id);
        setTimeout(() => resolve(usuario || null), 300);
    });
}

// ========================
// CONTROLAR SIDEBAR BASEADO NO TIPO
// ========================
export function controlarSidebar() {
    const tipo = verificarTipo();
    if (!tipo) return;

    const menuDashboard = document.getElementById('menu-dashboard');
    const menuUsuarios = document.getElementById('menu-usuarios');
    const menuProdutos = document.getElementById('menu-produtos');
    const menuLog = document.getElementById('menu-log');

    [menuDashboard, menuUsuarios, menuProdutos, menuLog].forEach(el => {
        if (el) el.style.display = 'none';
    });

    if (menuDashboard) menuDashboard.style.display = 'block';
    if (menuProdutos) menuProdutos.style.display = 'block';

    if (tipo === 'admin') {
        if (menuUsuarios) menuUsuarios.style.display = 'block';
        if (menuLog) menuLog.style.display = 'block';
    }
}

// ========================
// LOGOUT
// ========================
export function logout() {
    localStorage.removeItem('usuario');
    window.location.href = '../pages/login.html';
}

// ========================
// INICIALIZAÇÃO AUTOMÁTICA
// ========================
export function initAuth() {
    if (!verificarLogin()) {
        window.location.href = '../pages/login.html';
    } else {
        controlarSidebar();
    }
}