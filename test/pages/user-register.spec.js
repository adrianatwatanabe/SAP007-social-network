/*
  * @jest-environment jsdom
 */
import { registerNewUser } from '../../src/firebase-configuration/authentication.js';
import createRegister from '../../src/js/pages/user-register.js';

jest.mock('../../src/firebase-configuration/export.js');
jest.mock('../../src/firebase-configuration/authentication.js');

describe('É uma função', () => {
  it('registerNewUser', () => {
    expect(typeof registerNewUser).toBe('function');
  });
});

describe('registerNewUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Se o usuário for válido, deve-se criar um novo Usuário', () => {
    registerNewUser.mockResolvedValueOnce();
    const page = createRegister();
    const name = page.querySelector('#user-name');
    const email = page.querySelector('#user-email');
    const password = page.querySelector('#user-password');
    const passRepeat = page.querySelector('#user-password-repeat');
    const btnRegister = page.querySelector('#new-login');

    name.value = 'Novo Usuário';
    email.value = 'teste@teste.com';
    password.value = '123456';
    passRepeat.value = '123456';
    btnRegister.dispatchEvent(new Event('click'));
    expect(registerNewUser).toHaveBeenCalledTimes(1);
  });
  it('Se o email não for validado, deve-se mostrar o erro na tela', () => {
    registerNewUser.mockResolvedValueOnce();
    const page = createRegister();
    const name = page.querySelector('#user-name');
    const email = page.querySelector('#user-email');
    const password = page.querySelector('#user-password');
    const passRepeat = page.querySelector('#user-password-repeat');
    const btnRegister = page.querySelector('#new-login');
    const error = page.querySelector('#message');

    name.value = 'Novo Usuário';
    email.value = 'teste@tes';
    password.value = '123456';
    passRepeat.value = '123456';
    btnRegister.dispatchEvent(new Event('click'));
    expect(registerNewUser).not.toHaveBeenCalled();
    expect(error.textContent).toEqual('Preencha o campo<br>de email corretamente!');
  });
  it('Se todos os campos estiverem vazio, deve-se mostrar o erro na tela', () => {
    registerNewUser.mockResolvedValueOnce();
    const page = createRegister();
    const name = page.querySelector('#user-name');
    const email = page.querySelector('#user-email');
    const password = page.querySelector('#user-password');
    const passRepeat = page.querySelector('#user-password-repeat');
    const btnRegister = page.querySelector('#new-login');
    const error = page.querySelector('#message');

    name.value = '';
    email.value = '';
    password.value = '';
    passRepeat.value = '';
    btnRegister.dispatchEvent(new Event('click'));
    expect(registerNewUser).not.toHaveBeenCalled();
    expect(error.textContent).toEqual('Preencha todos os campos!');
  });
  it('Se a senha e sua repetição não forem iguais, deve-se mostrar o erro na tela', () => {
    registerNewUser.mockResolvedValueOnce();
    const page = createRegister();
    const name = page.querySelector('#user-name');
    const email = page.querySelector('#user-email');
    const password = page.querySelector('#user-password');
    const passRepeat = page.querySelector('#user-password-repeat');
    const btnRegister = page.querySelector('#new-login');

    name.value = 'Novo Usuário';
    email.value = 'teste@teste.com';
    password.value = '123456';
    passRepeat.value = '123';
    btnRegister.dispatchEvent(new Event('click'));
    expect(registerNewUser).not.toHaveBeenCalled();
  });
  it('Se o email já estiver cadastrado, deve-se mostrar o erro na tela', async () => {
    registerNewUser.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
    const page = createRegister();
    const name = page.querySelector('#user-name');
    const email = page.querySelector('#user-email');
    const password = page.querySelector('#user-password');
    const passRepeat = page.querySelector('#user-password-repeat');
    const btnRegister = page.querySelector('#new-login');
    const error = page.querySelector('#message');

    name.value = 'Raynara Pimenta';
    email.value = 'raynarapimenta@gmail.com';
    password.value = '123456';
    passRepeat.value = '123456';
    btnRegister.dispatchEvent(new Event('click'));
    expect(registerNewUser).toHaveBeenCalledTimes(1);
    await new Promise(process.nextTick);
    expect(error.textContent).toEqual('Email já cadastrado! Escolha outro email.');
  });
});
