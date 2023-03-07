<script lang="ts">
  import { Route, useMatch } from 'svelte-navigator';
  import { useNavigate } from 'svelte-navigator';
  import { authStore } from '~/stores/auth.store';

  export let path: string;
  export let component: Function = undefined;

  const navigate = useNavigate();
  const match = useMatch(path);

  $: isActive = !!$match;

  $: if ($authStore.token && isActive) {
    navigate('/', {
      replace: true,
    });
  }
</script>

{#if isActive}
  <Route {path} {component} />
{/if}
