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
          path: '/dashboard/analysis',
          name: 'analysis',
          locale: 'menu.dashboard.analysis',
        },
        {
          path: '/dashboard/monitor',
          name: 'monitor',
          locale: 'menu.dashboard.monitor',
        },
        {
          path: '/dashboard/workplace',
          name: 'workplace',
          locale: 'menu.dashboard.monitor',
        },
      ],
    },
    ]
}
