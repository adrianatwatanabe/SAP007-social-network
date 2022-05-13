export function validationMessage(name, email, password, passwordRepeat) {
  const validatedEmail = email.match(/[\w.\-+]+@[\w-]+\.[\w-.]+/gi);
  if (name && email && validatedEmail && password && passwordRepeat) {
    if (!name || !email || !password || !passwordRepeat) {
      return 'Preencha todos os campos!';
    }
    if (password !== passwordRepeat) {
      return 'As duas senhas não coincidem.<br>Digite-as novamente!';
    } else {
      return '';
    }
  } else if (email && validatedEmail && password) {
    return '';
  } else if (!email || !password) {
    return 'Preencha todos os campos!';
  } else {
    return 'Preencha o campo<br>de email corretamente!';
  }
}

export function resetEmailValidation(emailReset) {
  const validatedEmail = emailReset.match(/[\w.\-+]+@[\w-]+\.[\w-.]+/gi);
  if (!emailReset) {
    return 'Preencha o campo de email!';
  } else if (!validatedEmail) {
    return 'Preencha o campo<br>de email corretamente!';
  }
  return '';
}
