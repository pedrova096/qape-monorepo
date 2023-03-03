export const errorMessages = ([error]: string[]): string | undefined => {
  if (error) {
    const messages = {
      required: 'Este campo es requerido',
      email: 'Por favor ingrese un correo electrónico válido',
      match_field: 'Las campos no coinciden',
      length_between: 'Por favor ingrese un valor en el rango permitido',
    };

    return messages[error] || 'Por favor ingrese un valor válido';
  }
};
