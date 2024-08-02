import { faker } from '@faker-js/faker';

import { BasicStatus, PermissionType } from '#/enum';

/**
 * Organization data mock
 */
export const ORG_LIST = [
  {
    id: '1',
    name: 'East China Branch',
    status: 'enable',
    desc: faker.lorem.words(),
    order: 1,
    children: [
      { id: '1-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '1-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '1-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
  {
    id: '2',
    name: 'South China Branch',
    status: 'enable',
    desc: faker.lorem.words(),
    order: 2,
    children: [
      { id: '2-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '2-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '2-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  }
];

/**
 * User permission mock
 */
const NOTICE_PERMISSION = {
  id: '1',
  parentId: '',
  label: '공지사항',
  name: '공지사항',
  icon: 'solar:bell-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'notice',
  order: 1,
  children:[
    {
      id: '0157880245365433',
      parentId: '1',
      label: '공지사항 관리',
      name: '공지사항 관리',
      type: PermissionType.MENU,
      route: 'management',
      component: '/notice/index.tsx',
    },
    {
      id: '0157880245365434',
      parentId: '1',
      label: '공지사항 업로드',
      name: '공지사항 업로드',
      type: PermissionType.MENU,
      route: 'upload',
      component: '/notice/notice-upload/index.tsx',
    },
    {
      id: '0157880245365453',
      parentId: '1',
      label: '공지사항 본문',
      name: '공지사항 본문',
      type: PermissionType.MENU,
      route: ':id',
      component: '/notice/notice-detail/index.tsx',
      hide:true
    },
  ]
};

const EVENT_PERMISSION = {
  id: '2',
  parentId: '',
  label: '행사',
  name: '행사',
  icon: 'solar:file-text-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'event',
  order: 2,
  children:[
    {
      id: '0157880245365435',
      parentId: '2',
      label: '행사 관리',
      name: '행사 관리',
      type: PermissionType.MENU,
      route: 'management',
      component: '/event/index.tsx',
    },
    {
      id: '0157880245365436',
      parentId: '2',
      label: '행사 업로드',
      name: '행사 업로드',
      type: PermissionType.MENU,
      route: 'upload',
      component: '/event/event-upload/index.tsx',
    },
    {
      id: '015788024536523',
      parentId: '2',
      label: '행사 본문',
      name: '행사 본문',
      type: PermissionType.MENU,
      route: ':id',
      component: '/event/event-detail/index.tsx',
      hide:true
    },
  ]
};

const RULE_PERMISSION = {
  id: '3',
  parentId: '',
  label: '학칙/회칙',
  name: '학칙/회칙',
  icon: 'solar:book-bookmark-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'rule',
  order: 3,
  children:[
    {
      id: '0157880245365437',
      parentId: '3',
      label: '학칙/회칙 관리',
      name: '학칙/회칙 관리',
      type: PermissionType.MENU,
      route: 'management',
      component: '/rule/index.tsx',
    },
    {
      id: '0157880245365438',
      parentId: '3',
      label: '학칙/회칙 업로드',
      name: '학칙/회칙 업로드',
      type: PermissionType.MENU,
      route: 'upload',
      component: '/rule/rule-upload/index.tsx',
    },
    {
      id: '0157880245365453',
      parentId: '3',
      label: '학칙/회칙 본문',
      name: '학칙/회칙 본문',
      type: PermissionType.MENU,
      route: ':id',
      component: '/rule/rule-detail/index.tsx',
      hide:true
    },
  ]
};

const PROCEEDING_PERMISSION = {
  id: '4',
  parentId: '',
  label: '회의록',
  name: '회의록',
  icon: 'solar:clipboard-list-line-duotone',
  type: PermissionType.CATALOGUE,
  route: 'proceeding',
  order: 4,
  children:[
    {
      id: '0157880245365439',
      parentId: '4',
      label: '회의록 관리',
      name: '회의록 관리',
      type: PermissionType.MENU,
      route: 'management',
      component: '/proceeding/index.tsx',
    },
    {
      id: '0157880245365440',
      parentId: '4',
      label: '회의록 업로드',
      name: '회의록 업로드',
      type: PermissionType.MENU,
      route: 'upload',
      component: '/proceeding/proceeding-upload/index.tsx',
    },
    {
      id: '01578802453623423',
      parentId: '4',
      label: '회의록 본문',
      name: '회의록 본문',
      type: PermissionType.MENU,
      route: ':id',
      component: '/proceeding/proceeding-detail/index.tsx',
      hide:true
    },
  ]
};

const FAQ_PERMISSION = {
  id: '5',
  parentId: '',
  label: 'FAQ',
  name: 'FAQ',
  icon: 'solar:chat-round-call-line-duotone',
  type: PermissionType.CATALOGUE,
  route: 'faq',
  order: 5,
  children:[
    {
      id: '0157880245365441',
      parentId: '5',
      label: 'FAQ 관리',
      name: 'FAQ 관리',
      type: PermissionType.MENU,
      route: 'management',
      component: '/faq/index.tsx',
    },
    {
      id: '0157880245365442',
      parentId: '5',
      label: 'FAQ 업로드',
      name: 'FAQ 업로드',
      type: PermissionType.MENU,
      route: 'upload',
      component: '/faq/faq-upload/index.tsx',
    },
    {
      id: '015788024532342453',
      parentId: '5',
      label: 'FAQ 본문',
      name: 'FAQ 본문',
      type: PermissionType.MENU,
      route: ':id',
      component: '/faq/faq-detail/index.tsx',
      hide:true
    },
  ]
};

const TRANSACTION_PERMISSION = {
  id: '6',
  parentId: '',
  label: '입/출금 내역',
  name: '입/출금 내역',
  icon: 'solar:dollar-minimalistic-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'transaction',
  order: 6,
  children:[
    {
      id: '0157880245365443',
      parentId: '6',
      label: '입/출금 내역 관리',
      name: '입/출금 내역 관리',
      type: PermissionType.MENU,
      route: 'management',
      component: '/transaction/index.tsx',
    },
    {
      id: '0157880245365444',
      parentId: '6',
      label: '입/출금 내역 업로드',
      name: '입/출금 내역 업로드',
      type: PermissionType.MENU,
      route: 'upload',
      component: '/transaction/transaction-upload/index.tsx',
    },
    {
      id: '0157880245365477',
      parentId: '6',
      label: '입/출금 내역 본문',
      name: '입/출금 내역 본문',
      type: PermissionType.MENU,
      route: ':id',
      component: '/transaction/transaction-detail/index.tsx',
      hide:true
    },
  ]
};

const USER_MANAGEMENT_PERMISSION = {
  id: '7',
  parentId: '',
  label: '계정',
  name: '계정',
  icon: 'solar:user-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'user',
  order: 7,
  children:[
    {
      id:'11',
      parentId:'7',
      label:'프로필',
      name:'프로필',
      type:PermissionType.MENU,
      route:'profile',
      component:'/user/profile/index.tsx',
    },
    {
      id:'12',
      parentId:'7',
      label:'사용자 관리',
      name:'사용자 관리',
      type:PermissionType.MENU,
      route:'management',
      component:'/user/management/index.tsx'
    }
  ]
};


export const PERMISSION_LIST = [
  NOTICE_PERMISSION,
  EVENT_PERMISSION,
  FAQ_PERMISSION,
  USER_MANAGEMENT_PERMISSION,
  TRANSACTION_PERMISSION,
  PROCEEDING_PERMISSION,
  RULE_PERMISSION
];

/**
 * User role mock
 */
const ADMIN_ROLE = {
  id: '4281707933534332',
  name: 'Admin',
  label: 'admin',
  status: BasicStatus.ENABLE,
  order: 1,
  desc: 'Super Admin',
  permission: PERMISSION_LIST,
};
const TEST_ROLE = {
  id: '9931665660771476',
  name: 'Test',
  label: 'test',
  status: BasicStatus.ENABLE,
  order: 2,
  desc: 'test',
  permission: [NOTICE_PERMISSION,
    EVENT_PERMISSION,
    FAQ_PERMISSION,
    TRANSACTION_PERMISSION,
    PROCEEDING_PERMISSION,
    RULE_PERMISSION],
};
export const ROLE_LIST = [ADMIN_ROLE, TEST_ROLE];

/**
 * User data mock
 */
export const DEFAULT_USER = {
  id: 'b34719e1-ce46-457e-9575-99505ecee828',
  username: '김관리자',
  email: 'bigbrother@mju.ac.kr',
  avatar: faker.image.avatarLegacy(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.recent(),
  password: 'admin1234@',
  role: ADMIN_ROLE,
  permissions: ADMIN_ROLE.permission,
};
export const TEST_USER = {
  id: 'efaa20ea-4dc5-47ee-a200-8a899be29494',
  username: '김유저',
  password: 'test1234@',
  email: 'test@mju.ac.kr',
  avatar: faker.image.avatarLegacy(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.recent(),
  role: TEST_ROLE,
  permissions: TEST_ROLE.permission,
};
export const USER_LIST = [DEFAULT_USER, TEST_USER];
