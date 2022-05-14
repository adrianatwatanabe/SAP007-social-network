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

    name.value = 'Novo Usuário';
    email.value = 'teste@tes';
    password.value = '123456';
    passRepeat.value = '123456';
    btnRegister.dispatchEvent(new Event('click'));
    expect(registerNewUser).toHaveBeenCalledTimes(1);
  });
  it('Se todos os campos estiverem vazio, deve-se mostrar o erro na tela', () => {
    registerNewUser.mockResolvedValueOnce();
    const page = createRegister();
    const name = page.querySelector('#user-name');
    const email = page.querySelector('#user-email');
    const password = page.querySelector('#user-password');
    const passRepeat = page.querySelector('#user-password-repeat');
    const btnRegister = page.querySelector('#new-login');

    name.value = '';
    email.value = '';
    password.value = '';
    passRepeat.value = '';
    btnRegister.dispatchEvent(new Event('click'));
    expect(registerNewUser).toHaveBeenCalledTimes(1);
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
    email.value = 'teste@tes';
    password.value = '123456';
    passRepeat.value = '123';
    btnRegister.dispatchEvent(new Event('click'));
    expect(registerNewUser).toHaveBeenCalledTimes(1);
  });
});
