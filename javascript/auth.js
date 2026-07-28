
const ACCOUNTS_KEY = 'pawpaw_accounts';
const SESSION_KEY  = 'pawpaw_logged_in_email';

// Built-in demo account so the flow can be tested without signing up first.
const DEMO_ACCOUNT = {
    firstname: 'Demo',
    lastname: 'User',
    email: 'pawpawtest@gmail.com',
    password: 'pawpawtest123'
};

// Returns every stored account, seeding the demo account the first time.
function getAccounts() {
    const accounts = [];
    try {
        accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || [];
    } catch (e) {
        accounts = [];
    }

    const hasDemo = accounts.some(acc => acc.email.toLowerCase() === DEMO_ACCOUNT.email);
    if (!hasDemo) {
        accounts.push(DEMO_ACCOUNT);
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    }
    return accounts;
}

function findAccount(email) {
    if (!email) return null;
    return getAccounts().find(acc => acc.email.toLowerCase() === email.toLowerCase()) || null;
}

function accountExists(email) {
    return findAccount(email) !== null;
}

function createAccount(firstname, lastname, email, password) {
    const accounts = getAccounts();
    accounts.push({ firstname, lastname: lastname || '', email, password });
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function validateLogin(email, password) {
    const account = findAccount(email);
    return !!account && account.password === password;
}

function setLoggedInUser(email) {
    sessionStorage.setItem(SESSION_KEY, email);
}

function getLoggedInUser() {
    return sessionStorage.getItem(SESSION_KEY);
}

function logoutUser() {
    sessionStorage.removeItem(SESSION_KEY);
}
