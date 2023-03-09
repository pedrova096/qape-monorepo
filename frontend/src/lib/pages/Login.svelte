<script lang="ts">
  import { Link, navigate } from 'svelte-navigator';
  import Icon from '@iconify/svelte';
  import dots from '~/assets/decoration-dots.png';
  import Input from '~/lib/atoms/Input.svelte';
  import Button from '~/lib/atoms/Button.svelte';
  import InputPassword from '~/lib/molecules/InputPassword.svelte';
  import LoginForm, { email, password } from '~/forms/login.form';
  import type { LoginFormType } from '~/forms/Login.form';
  import { errorMessages } from '~/forms/errorMessages';
  import { handleSubmit } from '~/forms/handleSubmit';
  import { useApiCall } from '~/stores/useApiCall';
  import { signIn } from '~/services/auth.services';
  import toast from '~/stores/toast';
  import { authStore } from '~/stores/auth.store';
  import { onDestroy } from 'svelte';

  const { execute: signInCall, flags } = useApiCall(signIn, {
    runOnMount: false,
    onSuccess: (result) => {
      $authStore = result;
      toast.success('¡Bienvenido de vuelta!');
      navigate('/search', { replace: true });
    },
    onError: (error) => {
      toast.error('Hubo un error al iniciar sesión.');
      console.error(error);
    },
  });

  const submit = async (data: LoginFormType) => {
    signInCall(data);
  };

  onDestroy(() => {
    LoginForm.reset();
  });
</script>

<main class="flex justify-center items-center w-full h-screen pt-20">
  <div class="absolute z-10 bg-white p-10 rounded-lg min-w-[32rem]">
    <h1 class="font-bold text-xl tracking-wide">
      ¡Bienvenido <Icon icon="fluent-emoji:hugging-face" class="inline mb-2" />!
    </h1>
    <h2 class="text-slate-500 font-light">Entra a tu cuenta</h2>
    <form
      class="flex-1 flex flex-col gap-6 my-6"
      class:pointer-events={$flags.isLoading ? 'none' : ''}
      on:submit={handleSubmit(LoginForm, submit)}
    >
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
        helpText={errorMessages($password.errors)}
      />
      <Button variant="fill" type="submit" class="flex relative">
        {@const buttonText = $flags.isLoading ? 'Entrando' : 'Entrar'}
        <span class="text-center w-full">{buttonText}</span>
        {#if $flags.isLoading}
          <Icon
            icon="fluent:spinner-ios-20-filled"
            class="animate-spin text-xl absolute right-4"
          />
        {/if}
      </Button>
    </form>
    <footer class="w-full text-center">
      <span class="text-sm">
        ¿Ya tienes una cuenta?
        <Link to="/sign-up" class="font-bold underline">Regístrate</Link>
      </span>
    </footer>
  </div>
  <div
    class="flex-1 w-full h-full flex justify-center relative overflow-hidden"
  >
    <div
      class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-500 to-amber-300"
    />
    <img
      src={dots}
      alt="Dots"
      class="absolute -top-20 mix-blend-overlay h-[150%] opacity-20"
    />
  </div>
</main>
