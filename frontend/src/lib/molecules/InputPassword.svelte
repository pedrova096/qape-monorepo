<script lang="ts">
  import Icon from '@iconify/svelte';
  import Input from '~/lib/atoms/Input.svelte';

  export let label = '';
  export let value = '';

  let hide = true;
</script>

<Input
  {label}
  bind:value
  placeholder="********"
  type={hide ? 'password' : 'text'}
  {...$$props}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span
    class="absolute right-2 top-6 text-slate-600 text-2xl cursor-pointer z-10 "
    on:click={() => (hide = !hide)}
  >
    <Icon
      icon={hide ? 'akar-icons:eye-closed' : 'akar-icons:eye'}
      class="select-none"
    />
  </span>
</Input>
