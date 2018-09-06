export default {
  'GET /api/menus': [
    {
      path: '/dashboard',
      name: 'dashboard',
      icon: 'dashboard',
      locale: 'menu.dashboard',
      // authority:["admin"],
      children: [
        {
          path: '/dashboard/workplace',
          name: 'workplace',
          locale: 'menu.dashboard.workplace',
        },
      ],
    },
    ]
}
