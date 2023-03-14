<script>
  import { Router, Route } from 'svelte-navigator';
  import {
    Landing,
    SignUp,
    Login,
    Profile,
    NewItems,
    ItemDetail,
    Search,
  } from '~/lib/pages';
  import HeaderNav from '~/lib/molecules/HeaderNav.svelte';
  import PublicOnlyRoute from '~/lib/molecules/PublicOnlyRoute.svelte';
  import Toasts from '~/lib/atoms/Toasts.svelte';
  import { localStoragefy } from '~/stores/auth.store';

  localStoragefy();
</script>

<Router>
  <HeaderNav />
  <Toasts />
  <Route path="/" component={Landing} />
  <PublicOnlyRoute path="/sign-up" component={SignUp} />
  <PublicOnlyRoute path="/login" component={Login} />
  <Route path="/search" component={Search} />
  <Route path="/profile/*" component={Profile} />
  <Route path="/items/new" component={NewItems} />
  <Route path="/items/:id" component={ItemDetail} />
</Router>
