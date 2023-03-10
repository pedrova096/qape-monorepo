<script lang="ts">
  import { getUserItems } from '~/services/item.services';
  import { useApiCall } from '~/stores/useApiCall';
  import ListItems from '~/lib/atoms/ListItems.svelte';

  const { data: items } = useApiCall(getUserItems, {
    runOnMount: true,
  });
</script>

<ListItems items={$items || []} />
