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
    default:
      return '';
  }
}

export function errorsFirebaseModal(error) {
  switch (error) {
    case 'auth/user-not-found':
      return 'Usuário não encontrado!<br>Cadastre-se no LabFriends!';
    case 'auth/missing-email':
      return 'Preencha o campo de email!';
    default:
      return '';
  }
}
