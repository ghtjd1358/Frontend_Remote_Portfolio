// Remote3 (포트폴리오) LNB 메뉴 구조
export interface LnbItem {
  title: string;
  link: string;
  searchStr?: string;
  subItems?: LnbItem[];
}

export const lnbItems: LnbItem[] = [
  {
    title: '주요 프로젝트',
    link: '#portfolio',
    searchStr: '포트폴리오,주요,메인,portfolio',
  },
  {
    title: '기타 프로젝트',
    link: '#other',
    searchStr: '기타,사이드,other',
  },
];

export default lnbItems;
