<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Link, navigate } from 'svelte-navigator';
  import { handleSubmit } from '~/forms/handleSubmit';
  import { getUserById, updateUser } from '~/services/user.services';
  import { authStore, clearAuthStoreToken } from '~/stores/auth.store';
  import { useApiCall } from '~/stores/useApiCall';
  import Modal from '~/lib/atoms/Modal.svelte';
  import Button from '~/lib/atoms/Button.svelte';
  import Input from '~/lib/atoms/Input.svelte';
  import InputPassword from '~/lib/molecules/InputPassword.svelte';
  import editUserForm, {
    name,
    email,
    password,
    passwordConfirmation,
  } from '~/forms/editUser.form';
  import type { EditUserFormType } from '~/forms/editUser.form';
  import { errorMessages } from '~/forms/errorMessages';
  import toast from '~/stores/toast';

  let userId = $authStore.user?.id || 0;
  let editModal = false;

  const {
    data: user,
    flags,
    execute: getUserCall,
  } = useApiCall(() => getUserById(userId), {
    runOnMount: true,
    onSuccess: (data) => {
      name.set(data.name);
      email.set(data.email);
    },
  });

  const { flags: updFlags, execute: updateUserCall } = useApiCall(updateUser, {
    runOnMount: false,
    onSuccess: () => {
      toast.success('¡Usuario actualizado!');
      editModal = false;
      getUserCall();
    },
    onError: (e) => {
      toast.error('Hubo un error al actualizar el usuario.');
    },
  });

  const handleLogout = () => {
    clearAuthStoreToken();
    navigate('/', { replace: true });
  };

  const submitUserUpdate = async ({
    password,
    passwordConfirmation,
    ...data
  }: EditUserFormType) => {
    if (password) {
      updateUserCall({ ...data, password });
    } else {
      updateUserCall(data);
    }
  };

  $: if (!editModal) {
    password.reset();
    passwordConfirmation.reset();
  }
</script>

<div class="w-full flex justify-center">
  <main class="container h-screen flex flex-col pt-24 items-start">
    <header class="grid grid-flow-col	gap-x-4 pt-10 pb-2">
      {#if $user}
        {@const initial = $user.name[0].toUpperCase()}
        <span
          class="h-16 aspect-square bg-amber-500 shadow-md shadow-amber-200 block text-center leading-[4rem] text-4xl rounded-full text-white font-medium row-span-2"
        >
          {initial}
        </span>
        <h1 class="text-2xl font-semibold">Hola, {$user.name}</h1>
        <div class="flex items-center gap-2">
          <h2 class="text-lg text-slate-500">{$user.email}</h2>
          <Button class="row-start-4 !p-1" onClick={handleLogout}>Salir</Button>
        </div>
        <button
          class="p-1 rounded-full hover:bg-slate-100 mb-auto ml-10"
          on:click={() => (editModal = true)}
        >
          <Icon icon="fluent:edit-16-regular" class="text-2xl text-slate-500" />
        </button>
      {:else if $flags.isLoading}
        <h1 class="text-2xl font-semibold outline-slate-200">
          Cargando...
          <Icon
            icon="fluent:spinner-ios-20-filled"
            class="animate-spin inline ml-2"
          />
        </h1>
      {:else if $flags.isError}
        <h1 class="text-2xl font-semibold pt-2">Hola, no estás logueado</h1>
        <Link to="/login">
          <Button>Ir a login</Button>
        </Link>
      {/if}
    </header>
  </main>
</div>

<Modal open={editModal}>
  <form
    class="flex-1 flex flex-col gap-6 my-6 min-w-[32rem]"
    class:pointer-events={$updFlags.isLoading ? 'none' : ''}
    on:submit={handleSubmit(editUserForm, submitUserUpdate)}
  >
    <button
      on:click={() => (editModal = false)}
      class="p-1 rounded-full hover:bg-slate-100 ml-auto -mt-4"
    >
      <Icon icon="fluent:dismiss-12-regular" class="text-md text-slate-500" />
    </button>
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
    <Button variant="fill" type="submit" class="flex relative">
      {@const buttonText = $updFlags.isLoading ? 'Actualizando' : 'Actualizar'}
      <span class="text-center w-full">{buttonText}</span>
      {#if $updFlags.isLoading}
        <Icon
          icon="fluent:spinner-ios-20-filled"
          class="animate-spin text-xl absolute right-4"
        />
      {/if}
    </Button>
  </form>
</Modal>
