import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { ApiService } from '@/services';
import { useCommonStore } from '../common';
import { ICondition } from '@/types';

export const useConditionMetadataStore = defineStore(
  'condition-metadata',
  () => {
    const commonStore = useCommonStore();
    const conditions = ref<ICondition[]>([]);

    const setConditions = (conditions_: ICondition[]) => {
      conditions.value = conditions_;
    };

    const sortConditions = (conditions_: ICondition[]) => {
      if (!conditions_?.length) {
        return [];
      }

      return conditions_.sort((a, b) => a.order_by - b.order_by);
    };

    const getConditionMetadata = async (category?: string) => {
      return commonStore.actionWrapper(async () => {
        const res = await ApiService.getInstance().getConditionMetadata(
          category,
        );
        setConditions(sortConditions(res.data));

        return res.data;
      });
    };

    const groupedConditions = computed(() => {
      const categories: {
        category: string;
        conditions: ICondition[];
      }[] = [];

      conditions.value.forEach((condition) => {
        const category = categories.find(
          (c) => c.category === condition.category,
        );

        if (!category) {
          categories.push({
            category: condition.category,
            conditions: [condition],
          });
        } else {
          category.conditions.push(condition);
        }
      });

      return categories;
    });

    return {
      conditions,
      groupedConditions,

      getConditionMetadata,
    };
  },
);
