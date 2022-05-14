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

export function errorsFirebase(error) {
  switch (error) {
    case 'auth/email-already-in-use':
      return 'Email já cadastrado!<br>Escolha outro email.';
    case 'auth/weak-password':
      return 'Sua senha deve ter no<br> mínimo 6 caracteres.';
    case 'auth/user-not-found':
      return 'Usuário não encontrado!<br>Crie um cadastro na LabFriends!';
    case 'auth/wrong-password':
      return 'Senha errada!<br>Digite novamente!';
    case 'auth/missing-email':
      return 'Preencha o campo de email!';
    default:
      return '';
  }
}
