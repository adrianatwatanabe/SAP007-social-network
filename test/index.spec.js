/*
 * @jest-environment jsdom
*/
import { registerNewUser } from '../src/config/authentication.js';
import { createRegister } from '../src/js/pages/user-register.js'; 

jest.mock('../src/config/export.js');


describe('registerNewUser', () => {
  it('Deverá registrar um usuário', () => {
    registerNewUser.mockResolvedValue();

      const page = createRegister();
      const nameInput = page.querySelector('#user-name');
      const emailInput = page.querySelector('#user-email');
      const passwordInput = page.querySelector('#user-password');
      const passwordInputRepeat = page.querySelector('#user-password-repeat');
      const btnRegister = page.querySelector('#new-login');
      nameInput.value = 'Novo Usuario';
      emailInput.value = 'usuario@teste.com';
      passwordInput.value = '123456';
      passwordInputRepeat.value = '123456';
      const validatedEmail = emailInput.match(/[\w.\-+]+@[\w-]+\.[\w-.]+/gi);
      btnRegister.dispatchEvent(new Event('click'));

    expect(registerNewUser).toHaveBeenCalledWith(nameInput, emailInput, passwordInput);
    expect(registerNewUser).toHaveBeenCalledTimes(1);
  });
});


describe('registerNewUser', () => {
  it('Deverá registrar um usuário', () => {
    registeNewUser.mockResolvedValue();
    const page = createRegister();
    const nameInput = page.querySelector('#user-name');
    const emailInput = page.querySelector('#user-email');
    const passwordInput = page.querySelector('#user-password');
    const passwordInputRepeat = page.querySelector('#user-password-repeat');
    const btnRegister = page.querySelector('#new-login');
    nameInput.value = 'Novo usuário';
    emailInput.value = 'usuario@teste.com';
    passwordInput.value = '123456';
    passwordInputRepeat.value = '123456';

    const validatedEmail = emailInput.match(/[\w.\-+]+@[\w-]+\.[\w-.]+/gi);
    btnRegister.dispatchEvent(new Event('click'));
    expect(registerNewUser).toHaveBeenCalledWith(nameInput, emailInput, passwordInput);
    expect(registerNewUser).toHaveBeenCalledTimes(1);
  });
});
