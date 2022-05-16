/*
  * @jest-environment jsdom
 */
import { registerNewUser } from '../../src/firebase-configuration/authentication.js';
import { validationMessage } from '../../src/js/components/authentications/login-and-registration-validation.js';
import { createRegister } from '../../src/js/pages/user-register.js';

jest.mock('../../src/firebase-configuration/export.js'); 
jest.mock('../../src/firebase-configuration/authentication.js');

describe('registerNewUser', () => {
  it('Se o usuário for válido deve chamar registerNewUser', () => {
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
    validationMessage(name, email, password, passRepeat);
    expect(registerNewUser).toHaveBeenCalledTimes(1);
  });
  it('Se o email não for válido deve mostrar error', () => {
    registerNewUser.mockResolvedValueOnce();
    const page = createRegister();
    const name = page.querySelector('#user-name');
    const email = page.querySelector('#user-email');
    const password = page.querySelector('#user-password');
    const passRepeat = page.querySelector('#user-password-repeat');
    const btnRegister = page.querySelector('#new-login');
    name.value = 'Novo Usuário';
    email.value = 'teste@';
    password.value = '123456';
    passRepeat.value = '123456';
    btnRegister.dispatchEvent(new Event('click'));
    validationMessage(name, email, password, passRepeat);
    expect(registerNewUser).toHaveBeenCalledTimes(1);
  });
});
