// Remote3 (포트폴리오) LNB 메뉴 구조
export interface LnbItem {
  title: string;
  link: string;
  searchStr?: string;
  subItems?: LnbItem[];
}

export const lnbItems: LnbItem[] = [
  {
    title: '포트폴리오',
    link: '/portfolio#portfolio',
    searchStr: '포트폴리오,실무,portfolio',
  },
  {
    title: '토이 프로젝트',
    link: '/portfolio#toy',
    searchStr: '토이,사이드,toy,side',
  },
];

export default lnbItems;
