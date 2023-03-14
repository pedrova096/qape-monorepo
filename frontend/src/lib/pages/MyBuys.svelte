<script lang="ts">
  import { getBoughtItems } from '~/services/item.services';
  import { useApiCall } from '~/stores/useApiCall';
  import ListItems from '~/lib/atoms/ListItems.svelte';

  const { data: items } = useApiCall(getBoughtItems, {
    runOnMount: true,
  });
</script>

<ListItems items={$items || []} />
