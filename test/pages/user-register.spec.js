/*
  * @jest-environment jsdom
 */
import { createRegister } from '../../src/js/pages/user-register.js';
import { registerNewUser } from '../../src/firebase-configuration/authentication.js';

jest.mock('../../src/firebase-configuration/export.js');
jest.mock('../../src/firebase-configuration/authentication.js');

describe('registerNewUser', () => {
  it('Deverá cadastrar um novo usuário', () => {
    registerNewUser.mockResolvedValue();
    const page = createRegister();
    const btnRegister = page.querySelector('#new-login');
    btnRegister.dispatchEvent(new Event('submit'));
    const nameUser = page.querySelector('#user-name');
    const email = page.querySelector('#user-email');
    const password = page.querySelector('#user-password');
    const repeat = page.querySelector('#user-password-repeat');

    nameUser.value = 'Novousuario';
    email.value = 'teste@teste.com';
    password.value = '123456';
    repeat.value = '123456';
    expect(registerNewUser).toBeenCalled(nameUser, email, password);
  });
});
