<script>
  import qapeLogo from '../../assets/qape-logo.svg';
  import Button from '../atoms/Button.svelte';
  import { Link } from 'svelte-navigator';
</script>

<header class="p-6 absolute w-full">
  <nav class="container mx-auto flex items-center justify-between relative">
    <Link to="/" class="z-10">
      <img src={qapeLogo} class="h-8" alt="Qape Logo" />
    </Link>
    <div>
      <a href="#" class="px-4 py-2 hover:bg-slate-100 rounded-md font-semibold">
        Inicio
      </a>
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
