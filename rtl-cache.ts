// import stylisRTLPlugin from 'stylis-plugin-rtl';
import { createEmotionCache } from '@mantine/core';

const rtlCache = createEmotionCache({
  key: 'mantine',
  prepend: false,
  // stylisPlugins: [stylisRTLPlugin],
});

export default rtlCache;
