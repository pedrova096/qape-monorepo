<script>
  import qapeLogo from '~/assets/qape-logo.svg';
  import Button from '~/lib/atoms/Button.svelte';
  import DecorationDots from '~/lib/atoms/DecorationDots.svelte';
  import { Link, useLocation } from 'svelte-navigator';

  const location = useLocation();

  $: isNotLanding = $location.pathname !== '/';
</script>

<header
  class="p-6 absolute w-full bg-white"
  class:overflow-hidden={isNotLanding}
  class:shadow={isNotLanding}
  class:z-20={isNotLanding}
>
  <nav class="container mx-auto flex items-center justify-between relative">
    <Link to="/" class="z-10">
      <img src={qapeLogo} class="h-8" alt="Qape Logo" />
    </Link>
    <DecorationDots class="-top-32 -left-20" />
    <div>
      <Link
        to="/"
        class="px-4 py-2 hover:bg-slate-100 rounded-md font-semibold"
      >
        Inicio
      </Link>
      <a href="#" class="px-4 py-2 hover:bg-slate-100 rounded-md font-semibold">
        Nosotros
      </a>
      <a href="#" class="px-4 py-2 hover:bg-slate-100 rounded-md font-semibold">
        Login
      </a>
      <Link to="/sign-up">
        <Button class="!py-2">Regístrate</Button>
      </Link>
    </div>
  </nav>
</header>
