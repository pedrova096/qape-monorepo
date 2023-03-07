<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Link, navigate } from 'svelte-navigator';
  import { getUserById } from '~/services/user.services';
  import { authStore, clearAuthStoreToken } from '~/stores/auth.store';
  import { useApiCall } from '~/stores/useApiCall';
  import Button from '../atoms/Button.svelte';

  let userId = $authStore.user?.id || 0;

  const { data: user, flags } = useApiCall(() => getUserById(userId));

  const handleLogout = () => {
    clearAuthStoreToken();
    navigate('/', { replace: true });
  };
</script>

<div class="w-full flex justify-center">
  <main class="container h-screen flex flex-col pt-24 items-start">
    <header class="grid grid-flow-col	gap-x-4 pt-10 pb-2">
      {#if $flags.isSuccess}
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
        <button class="p-1 rounded-full hover:bg-slate-100 mb-auto ml-10">
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
