/*
  * @jest-environment jsdom
 */
import { authUserLabFriends, authUserWithGoogle, forgotPassword } from '../../src/firebase-configuration/authentication.js';
import createLogin from '../../src/js/pages/login.js';

jest.mock('../../src/firebase-configuration/export.js');
jest.mock('../../src/firebase-configuration/authentication.js');

describe('É uma função', () => {
  it('authUserLabFriends', () => {
    expect(typeof authUserLabFriends).toBe('function');
  });
  it('authUserWithGoogle', () => {
    expect(typeof authUserWithGoogle).toBe('function');
  });
  it('forgotPassword', () => {
    expect(typeof forgotPassword).toBe('function');
  });
});

describe('authUserLabFriends', () => {
  it('Se o usuário for válido, deve-se logar com email e senha na LabFriends', () => {
    authUserLabFriends.mockResolvedValueOnce();
    const page = createLogin();
    const email = page.querySelector('#user-email-login');
    const password = page.querySelector('#user-password-login');
    const btnLogin = page.querySelector('#login-labfriends');

    email.value = 'teste@teste.com';
    password.value = '123456';
    btnLogin.dispatchEvent(new Event('click'));
    expect(authUserLabFriends).toHaveBeenCalledTimes(1);
  });
  it('Se o email não for validado, deve-se mostrar o erro na tela', () => {
    authUserLabFriends.mockResolvedValueOnce();
    const page = createLogin();
    const email = page.querySelector('#user-email-login');
    const password = page.querySelector('#user-password-login');
    const btnLogin = page.querySelector('#login-labfriends');

    email.value = 'teste@te';
    password.value = '123456';
    btnLogin.dispatchEvent(new Event('click'));
    expect(authUserLabFriends).toHaveBeenCalledTimes(1);
  });
  it('Se todos os campos estiverem vazio, deve-se mostrar o erro na tela', () => {
    authUserLabFriends.mockResolvedValueOnce();
    const page = createLogin();
    const email = page.querySelector('#user-email-login');
    const password = page.querySelector('#user-password-login');
    const btnLogin = page.querySelector('#login-labfriends');

    email.value = 'teste@te';
    password.value = '123456';
    btnLogin.dispatchEvent(new Event('click'));
    expect(authUserLabFriends).toHaveBeenCalledTimes(1);
  });
});

describe('authUserWithGoogle', () => {
  it('Se o usuário for válido, deve-se logar com a conta do Google', () => {
    authUserWithGoogle.mockResolvedValueOnce();
    const page = createLogin();
    const btnGoogle = page.querySelector('#login-google');

    btnGoogle.dispatchEvent(new Event('click'));
    expect(authUserWithGoogle).toHaveBeenCalledTimes(1);
  });
});
