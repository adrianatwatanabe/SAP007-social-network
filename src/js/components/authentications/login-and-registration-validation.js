export function validationMessage(name, email, password, passwordRepeat) {
  const regex = /[\w.\-+]+@[\w-]+\.[\w-.]/gi;
  const validatedEmail = regex.test(email);
  if (name && email && validatedEmail && password && passwordRepeat) {
    if (!name || !email || !password || !passwordRepeat) {
      return 'Preencha todos os campos!';
    }
    return (password !== passwordRepeat) ? 'As duas senhas não coincidem.<br>Digite-as novamente!' : '';
  } if (email && validatedEmail && password) {
    return '';
  } if (!email || !password) {
    return 'Preencha todos os campos!';
  }
  return 'Preencha o campo<br>de email corretamente!';
}

export function resetEmailValidation(emailReset) {
  const validatedEmail = emailReset.match(/[\w.\-+]+@[\w-]+\.[\w-.]+/gi);
  if (!emailReset) {
    return 'Preencha o campo de email!';
  } if (!validatedEmail) {
    return 'Preencha o campo<br>de email corretamente!';
  }
  return '';
}
