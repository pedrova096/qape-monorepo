<script lang="ts">
  import { Link } from 'svelte-navigator';
  import Icon from '@iconify/svelte';
  import heroPhoto from '~/assets/pexels-ekaterina-bolovtsova-4050214.png';
  import dots from '~/assets/decoration-dots.png';
  import Input from '~/lib/atoms/Input.svelte';
  import Button from '~/lib/atoms/Button.svelte';
  import InputPassword from '~/lib/molecules/InputPassword.svelte';
  import signupForm, {
    name,
    email,
    password,
    passwordConfirmation,
  } from '~/forms/signup.form';
  import type { SignupFormType } from '~/forms/signup.form';
  import { errorMessages } from '~/forms/errorMessages';
  import { handleSubmit } from '~/forms/handleSubmit';

  const submit = async (data: SignupFormType) => {
    alert(JSON.stringify(data, null, 2));
  };
</script>

<div class="w-full flex justify-center overflow-hidden relative">
  <main class="container flex h-screen pt-20">
    <section class="p-20 pb-0 flex-1 flex flex-col relative z-10">
      <h1
        class="text-white font-medium text-3xl z-10 leading-tight tracking-wider"
      >
        <span>¡Únete al mundo</span><br />
        <span>que buscabas</span>
        <Icon icon="fluent-emoji:globe-showing-americas" class="inline" />!
        <br />
        <b>Regístrate ahora</b>
      </h1>
      <img
        src={heroPhoto}
        alt="Happy woman listening to music"
        class="h-[85%] object-contain bottom-0 right-20 absolute"
      />
    </section>
    <section
      class="w-1/2 h-full flex flex-col relative bg-white py-20 px-10 z-10 gap-8"
    >
      <h2 class="font-bold text-2xl tracking-wide">Crea tu cuenta</h2>
      <form
        class="flex-1 flex flex-col gap-6"
        on:submit={handleSubmit(signupForm, submit)}
      >
        <Input
          label="Nombre"
          placeholder="John Doe"
          bind:value={$name.value}
          error={$name.invalid}
          helpText={errorMessages($name.errors)}
        />
        <Input
          label="Correo"
          placeholder="john@doe.com"
          type="email"
          bind:value={$email.value}
          error={$email.invalid}
          helpText={errorMessages($email.errors)}
        />
        <InputPassword
          label="Contraseña"
          bind:value={$password.value}
          error={$password.invalid}
          helpText={errorMessages($password.errors) ||
            'La contraseña debe tener al menos 6 caracteres'}
        />
        <InputPassword
          label="Confirmar contraseña"
          bind:value={$passwordConfirmation.value}
          error={$passwordConfirmation.invalid}
          helpText={errorMessages($passwordConfirmation.errors)}
        />
        <Button variant="fill" type="submit">Crear</Button>
      </form>
      <footer class="w-full text-center">
        <span class="text-sm">
          ¿Ya tienes una cuenta?
          <Link to="/login" class="font-bold underline">Entrar</Link>
        </span>
      </footer>
    </section>
    <div
      class="absolute top-20 left-0 w-1/2 h-full bg-gradient-to-b from-amber-500 to-amber-300"
    />
    <img
      src={dots}
      alt="Dots"
      class="absolute top-20 -left-12 mix-blend-overlay h-[150%] opacity-20"
    />
  </main>
</div>
