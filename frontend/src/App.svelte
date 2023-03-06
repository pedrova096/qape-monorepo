<script>
  import { Router, Route } from 'svelte-navigator';
  import { Landing, SignUp } from '~/lib/pages';
  import HeaderNav from '~/lib/molecules/HeaderNav.svelte';
  import Toasts from '~/lib/atoms/Toasts.svelte';
</script>

<Router>
  <HeaderNav />
  <Toasts />
  <Route path="/" component={Landing} />
  <Route path="/sign-up" component={SignUp} />
</Router>
