import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'checkout/:cartId',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Return sample cart IDs for prerendering
      // In a real app, you might want to fetch actual cart IDs from your database
      return [
        { cartId: 'sample-cart-1' },
        { cartId: 'sample-cart-2' },
        { cartId: 'sample-cart-3' }
      ];
    }
  },
  {
    path: 'brand/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Return sample brand IDs for prerendering
      // In a real app, you might want to fetch actual brand IDs from your database
      return [
        { id: 'brand-1' },
        { id: 'brand-2' },
        { id: 'brand-3' },
        { id: 'brand-4' },
        { id: 'brand-5' }
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
