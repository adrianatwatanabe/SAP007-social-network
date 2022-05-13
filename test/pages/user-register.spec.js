/*
  * @jest-environment jsdom
 */
import { registerNewUser } from '../../src/firebase-configuration/authentication.js';
import { validationMessage } from '../../src/js/components/authentications/login-and-registration-validation.js';

jest.mock('../../src/firebase-configuration/export.js');
jest.mock('../../src/firebase-configuration/authentication.js');

describe('userValidation', () => {
  it('Se o usuário for válido deve chamar registerNewUser', async () => {
    registerNewUser.mockResolvedValue();
    const nameUser = 'Novousuario';
    const email = 'teste@teste.com';
    const password = '123456';
    const repeat = '123456';
    const message = document.createElement('p');
    message.setAttribute('id', 'message');
    await validationMessage(nameUser, email, password, repeat, message);
    expect(registerNewUser).toBeenCalled(nameUser, email, password);
  });
});
