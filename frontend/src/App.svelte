<script>
  import { Router, Route, Link } from 'svelte-navigator';
  import { Landing, SignUp } from './lib/pages';
  import qapeLogo from './assets/qape-logo.svg';
</script>

<Router>
  <header class="p-6 absolute w-full">
    <nav class="container mx-auto flex items-center justify-between relative">
      <Link to="/" class="z-10">
        <img src={qapeLogo} class="h-8" alt="Qape Logo" />
      </Link>
      <div>
        <a
          href="#"
          class="px-4 py-2 hover:bg-slate-100 rounded-md font-semibold"
        >
          Inicio
        </a>
        <a
          href="#"
          class="px-4 py-2 hover:bg-slate-100 rounded-md font-semibold"
        >
          Nosotros
        </a>
        <a
          href="#"
          class="px-4 py-2 hover:bg-slate-100 rounded-md font-semibold"
        >
          Login
        </a>
        <Link
          to="/sign-up"
          class="outline outline-2 outline-slate-800 -outline-offset-2 px-4 py-2 rounded-md font-semibold"
        >
          Regístrate
        </Link>
      </div>
    </nav>
  </header>

  <Route path="/" component={Landing} />
  <Route path="/sign-up" component={SignUp} />
</Router>
