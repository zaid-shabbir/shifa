import { PageId } from '@/constants';
import { ISideBarItemChild } from './side-bar-item-child';

export interface ISideBarItem {
  pageId: PageId;
  name: string;
  icon: string;
  children: ISideBarItemChild[];
}
