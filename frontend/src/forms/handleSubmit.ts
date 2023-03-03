import type { form } from 'svelte-forms';
import { get } from 'svelte/store';

export const handleSubmit =
  (f: ReturnType<typeof form>, callback: (values: unknown) => void) =>
  (event: Event) => {
    event.preventDefault();
    (async () => {
      await f.validate();
      const formStore = get(f);
      if (formStore.valid) {
        callback(formStore.summary);
      }
    })();
  };
